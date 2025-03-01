"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabase";
import "../styles/home.css";

export default function Header() {
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(""); // Track login or signup
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState(""); // Add username state
  const [user, setUser] = useState(null); // Store logged-in user
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false); // Add confirmation popup state

  useEffect(() => {
    // Fetch the current logged-in user
    const fetchUser = async () => {
      const { data: session } = await supabase.auth.getSession();
      if (session?.session) {
        setUser(session.session.user);
      }
    };
    fetchUser();

    // Listen for auth state changes
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        setUser(session?.user || null);
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
      } else if (event === 'USER_UPDATED') {
        setUser(session?.user || null);
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const openModal = (type) => {
    setModalType(type);
    setShowModal(true);
    setError("");
    setUsername(""); // Clear username when opening modal
    setShowConfirmation(false); // Reset confirmation state
  };

  const handleAuth = async () => {
    setLoading(true);
    setError("");

    if (!email || !password) {
      setError("⚠️ Email and password are required!");
      setLoading(false);
      return;
    }

    if (modalType === "signup" && !username) {
      setError("⚠️ Username is required for signup!");
      setLoading(false);
      return;
    }

    try {
      let result;
      if (modalType === "signup") {
        result = await supabase.auth.signUp({ 
          email, 
          password,
          options: {
            data: {
              username: username,
              name: username,
              display_name: username
            }
          }
        });
        
        if (!result.error) {
          setShowConfirmation(true);
          setShowModal(false);
        }
      } else {
        result = await supabase.auth.signInWithPassword({ email, password });
        if (!result.error) {
          setShowModal(false);
        }
      }

      if (result.error) throw result.error;
      setUser(result.data.user);
    } catch (err) {
      setError(`❌ ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setShowConfirmation(false);
  };

  // Check if user is verified
  const isVerified = user?.email_confirmed_at || user?.confirmed_at;

  return (
    <>
      <header className="header">
        <div className="container">
          <nav className="nav-cont">
            <div>
              <Link href="/">Home</Link>
              <Link href="/dashboard">Get Advice</Link>
            </div>
            <div>
              <Link href="/optimize">Optimize Protein Factory</Link>
            </div>
            <div>
              {user ? (
                isVerified ? (
                  <>
                    <span className="user-info">👨🏼 {user.identities[0].identity_data.display_name}</span>
                    <button className="nav-btn logout-btn" onClick={handleLogout}>
                      Logout
                    </button>
                  </>
                ) : (
                  <span className="verification-msg">Please verify your email to continue</span>
                )
              ) : (
                <>
                  <button className="nav-btn" onClick={() => openModal("login")}>Login</button>
                  <button className="nav-btn" onClick={() => openModal("signup")}>Sign Up</button>
                </>
              )}
            </div>
          </nav>
        </div>
      </header>

      {/* Signup Confirmation Modal */}
      {showConfirmation && (
        <div className="modal-overlay">
          <div className="modal-bg">
            <h2>✉️ Verify Your Email</h2>
            <p>Please check your email ({email}) to verify your account.</p>
            <p>You will need to verify your email before accessing all features.</p>
            <button className="modal-btn" onClick={() => setShowConfirmation(false)}>
              Got it!
            </button>
          </div>
        </div>
      )}

      {/* Auth Modal (Login & Signup) */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-bg">
            <h2>{modalType === "login" ? "Login" : "Sign Up"}</h2>
            {modalType === "signup" && (
              <input 
                type="text" 
                placeholder="Enter Username" 
                className="modal-input-box"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            )}
            <input 
              type="email" 
              placeholder="Enter Email" 
              className="modal-input-box"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input 
              type="password" 
              placeholder="Enter Password" 
              className="modal-input-box"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && <p className="error-msg">{error}</p>}

            <button className="modal-btn" onClick={handleAuth} disabled={loading}>
              {loading ? "Processing..." : modalType === "login" ? "Login" : "Register"}
            </button>

            <button className="btn-close" onClick={() => setShowModal(false)}>Close</button>
          </div>
        </div>
      )}
    </>
  );
}
