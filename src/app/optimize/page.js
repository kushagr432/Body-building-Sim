"use client";
import { useState } from "react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import "../styles/optimize.css";

export default function Optimize() {
  const [inputs, setInputs] = useState({ A: 0, B: 0, C: 0, D: 0, E: 0 });
  const [result, setResult] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);

  const machines = [
    { name: "A", protein: 10, electricity: 2 },
    { name: "B", protein: 20, electricity: 5 },
    { name: "C", protein: 35, electricity: 10 },
    { name: "D", protein: 50, electricity: 15 },
    { name: "E", protein: 100, electricity: 40 },
  ];

  const handleInputChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: parseInt(e.target.value) || 0 });
  };

  const calculateOptimization = () => {
    let totalProtein = 0;
    let totalElectricity = 0;

    machines.forEach(({ name, protein, electricity }) => {
      totalProtein += protein * inputs[name];
      totalElectricity += electricity * inputs[name];
    });

    if (totalElectricity > 50) {
      setResult({ error: "⚠️ Electricity limit exceeded! Reduce usage." });
    } else {
      const newResult = { protein: totalProtein, electricity: totalElectricity };
      setResult(newResult);

      // Add to leaderboard (keep top 5 results sorted)
      setLeaderboard((prev) => {
        const updated = [...prev, newResult].sort((a, b) => b.protein - a.protein).slice(0, 5);
        return updated;
      });
    }
  };

  return (
    <section className="optimize">
        <div className="row-cont">

      <div className="optimize-container">
        
        {/* Left Section: Input Form */}
        <div className="optimize-section">
          <h2>🔧 Machine Usage</h2>
          <div className="input-form">
            {machines.map(({ name }) => (
                <div key={name} className="input-group">
                <label>Machine {name}:</label>
                <input type="number" name={name} value={inputs[name]} onChange={handleInputChange} min="0" />
              </div>
            ))}
          </div>
          <button className="btn" onClick={calculateOptimization}>Calculate</button>

          {/* Display Results */}
          {result && (
              <div className="result-box">
              {result.error ? (
                  <p className="error">{result.error}</p>
                ) : (
                    <>
                  <p>✅ Protein Produced: <strong>{result.protein}g</strong></p>
                  <p>⚡ Electricity Used: <strong>{result.electricity}kW</strong></p>
                </>
              )}
            </div>
          )}
        </div>

        {/* Middle Section: Graph */}
        <div className="optimize-section">
          <h2>📊 Energy vs. Protein Output</h2>
          {result && !result.error && (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={[result]} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="electricity" label={{ value: "Electricity (kW)", position: "insideBottom", offset: -5 }} />
      <YAxis label={{ value: "Protein (g)", angle: -90, position: "insideLeft" }} />
      <Tooltip />
      <Bar dataKey="protein" fill="#82ca9d" barSize={50} />
    </BarChart>
  </ResponsiveContainer>
)}

        </div>

        {/* Right Section: Leaderboard */}
        <div className="optimize-section">
          <h2>🏆 Best Strategies</h2>
          {leaderboard.length > 0 ? (
              <ul>
              {leaderboard.map((entry, index) => (
                  <li key={index}>
                  {index + 1}. ⚡ {entry.electricity} kW → 🍗 {entry.protein}g Protein
                </li>
              ))}
            </ul>
          ) : (
              <p>No results yet. Optimize your factory!</p>
            )}
        </div>

      </div>
            </div>
    </section>
  );
}
