// src/pages/Callback.js
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

export default function Callback() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const code = new URLSearchParams(location.search).get("code");
    if (!code) return;

    async function exchangeCode() {
      try {
        const res = await axios.post("/.netlify/functions/exchange", { code });
        const { access_token } = res.data;

        localStorage.setItem("spotify_access_token", access_token);
        navigate("/dashboard");
      } catch (err) {
        console.error("Token exchange failed", err);
        alert("Authentication failed.");
      }
    }

    exchangeCode();
  }, [location, navigate]);

  return <p>Logging you in...</p>;
}
