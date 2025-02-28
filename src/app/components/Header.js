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
  const [user, setUser] = useState(null); // Store logged-in user
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
      setUser(session?.user || null);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const openModal = (type) => {
    setModalType(type);
    setShowModal(true);
    setError("");
  };

  const handleAuth = async () => {
    setLoading(true);
    setError("");

    if (!email || !password) {
      setError("⚠️ Email and password are required!");
      setLoading(false);
      return;
    }

    try {
      let result;
      if (modalType === "signup") {
        result = await supabase.auth.signUp({ email, password });
      } else {
        result = await supabase.auth.signInWithPassword({ email, password });
      }

      if (result.error) throw result.error;

      setUser(result.data.user); // Set user after login/signup
      setShowModal(false);
    } catch (err) {
      setError(`❌ ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <>
      <header className="header">
        <div className="container">
          <nav className="nav-cont">
            <div>
              <Link href="/">Home</Link>
              <Link href="/">Get Advice</Link>
            </div>
            <div>
              <Link href="/optimize">Optimize Protein Factory</Link>
            </div>
            <div>
              {user ? (
                <>
                  <span className="user-info">👨🏼 {user.email}</span>
                  <button className="nav-btn logout-btn" onClick={handleLogout}>
                    Logout
                  </button>
                </>
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

      {/* Modal (Login & Signup) */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-bg">
            <h2>{modalType === "login" ? "Login" : "Sign Up"}</h2>
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
