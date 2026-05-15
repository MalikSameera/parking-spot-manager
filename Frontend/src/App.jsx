import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [spots, setSpots] = useState([]);
  const [selectedSpot, setSelectedSpot] = useState(null);
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });

  const API_URL = "http://localhost:8000/api/parking";

  const getAllSpots = async () => {
    try {
      const response = await axios.get(`${API_URL}/getAll`);
      setSpots(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (token) getAllSpots();
  }, [token]);

  const handleAuth = async () => {
    const endpoint = isLogin ? "/login" : "/register";
    try {
      const res = await axios.post(`${API_URL}${endpoint}`, formData);
      if (isLogin) {
        localStorage.setItem("token", res.data.token);
        setToken(res.data.token);
      } else {
        alert("Registered! Please login.");
        setIsLogin(true);
      }
    } catch (err) {
      alert("Authentication failed");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  const bookSpot = async () => {
    if (!vehicleNumber) return alert("Enter vehicle number");
    try {
      await axios.put(`${API_URL}/update/${selectedSpot._id}`, {
        isAvailable: false,
        vehicleNumber: vehicleNumber,
      });
      setSelectedSpot(null);
      setVehicleNumber("");
      getAllSpots();
    } catch (error) {
      alert("Error booking spot");
    }
  };

  const releaseSpot = async (id) => {
    try {
      await axios.put(`${API_URL}/update/${id}`, { isAvailable: true, vehicleNumber: null });
      getAllSpots();
    } catch (error) {
      alert("Error releasing spot");
    }
  };

  if (!token) {
    return (
      <div className="container">
        <div className="booking-card">
          <h2>{isLogin ? "LOGIN" : "REGISTER"}</h2>
          {!isLogin && (
            <input type="text" placeholder="Name" onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
          )}
          <input type="email" placeholder="Email" onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
          <input type="password" placeholder="Password" onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
          <br />
          <button className="btn-book" onClick={handleAuth}>{isLogin ? "Login" : "Register"}</button>
          <p onClick={() => setIsLogin(!isLogin)} style={{ cursor: "pointer", marginTop: "10px", color: "#38bdf8" }}>
            {isLogin ? "Need an account? Register" : "Have an account? Login"}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", maxWidth: "1200px", margin: "0 auto" }}>
        <h2>🚀 PRO PARKING</h2>
        <button onClick={logout} className="btn-release" style={{ height: "40px" }}>Logout</button>
      </div>

      {selectedSpot && (
        <div className="booking-card">
          <h3>Book: {selectedSpot.spotNumber}</h3>
          <input type="text" placeholder="Vehicle Number" value={vehicleNumber} onChange={(e) => setVehicleNumber(e.target.value)} />
          <br />
          <button className="btn-book" onClick={bookSpot}>Confirm</button>
          <button className="btn-cancel" onClick={() => setSelectedSpot(null)}>Cancel</button>
        </div>
      )}

      <div className="parking-grid">
        {spots.map((spot) => (
          <div key={spot._id} className={`parking-spot ${spot.isAvailable ? "available" : "occupied"}`} onClick={() => spot.isAvailable && setSelectedSpot(spot)}>
            <div className="status-text">{spot.isAvailable ? "● AVAILABLE" : "● OCCUPIED"}</div>
            <h1 style={{ fontSize: "2.5rem", margin: "10px 0" }}>{spot.spotNumber}</h1>
            <p style={{ color: "#94a3b8" }}>{spot.zone}</p>
            {!spot.isAvailable && (
              <div style={{ marginTop: "15px" }}>
                <p style={{ color: "#38bdf8", fontWeight: "bold" }}>🚗 {spot.vehicleNumber}</p>
                <button className="btn-release" onClick={(e) => { e.stopPropagation(); releaseSpot(spot._id); }}>Release</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;