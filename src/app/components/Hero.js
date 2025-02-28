"use client";
import { useState } from "react";
import "../styles/home.css";

export default function Hero() {
  const [inputValue, setInputValue] = useState("");
  const [chats, setChats] = useState([]); // Stores chat history
  const [loading, setLoading] = useState(false);

  // Fetch AI response from API
  const handleGetAdvice = async () => {
    if (!inputValue.trim()) return;

    const userMessage = { type: "user", text: inputValue };
    setChats((prevChats) => [...prevChats, userMessage]);
    setInputValue(""); // Clear input field
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: inputValue }),
      });

      const data = await res.json();
      const botResponse = { type: "bot", text: data.reply };
      setChats((prevChats) => [...prevChats, botResponse]);
    } catch (error) {
      setChats((prevChats) => [...prevChats, { type: "bot", text: "Error fetching AI response." }]);
    } finally {
      setLoading(false);
    }
  };

  // Clear chat history
  const handleClearChat = () => {
    setChats([]);
  };

  return (
    <section className="hero">
      <div className="container">
        <h1>AI-Powered Bodybuilding Advice</h1>
        <p>Get personalized workout & diet advice using AI.</p>

        {/* Chat Messages */}
        <div className="response-box">
          {chats.map((chat, index) => (
            <div key={index} className={chat.type === "user" ? "user-message" : "bot-message"}>
              {chat.text}
            </div>
          ))}
          {loading && <div className="bot-message">Analyzing your prompt... 🤖</div>}
        </div>

        {/* Input Box at Bottom */}
        <div className="input-container">
          <textarea
            className="input-box"
            placeholder="Enter your fitness goals..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </div>

        {/* Buttons */}
        <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
          <button className="btn" onClick={handleGetAdvice} disabled={loading}>
            {loading ? "Loading..." : "Get Advice"}
          </button>
          <button className="btn clear-btn" onClick={handleClearChat}>
            Clear Chat
          </button>
        </div>
      </div>
    </section>
  );
}
