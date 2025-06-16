import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Callback() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    if (!code) {
      setError("No authorization code found.");
      return;
    }

    axios
      .post("/.netlify/functions/auth", { code })
      .then((res) => {
        const { access_token } = res.data;
        localStorage.setItem("spotify_token", access_token);
        navigate("/dashboard"); 
      })
      .catch((err) => {
        console.error("Auth Error:", err);
        setError("Authentication failed.");
      });
  }, [navigate]);

  return (
    <div style={{ textAlign: "center", marginTop: "10rem" }}>
      <h2>Logging you in...</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
