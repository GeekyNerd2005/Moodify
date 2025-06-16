import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Callback() {
  const navigate = useNavigate();

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const code = query.get("code");

    if (!code) {
      alert("No authorization code found");
      return;
    }

    const exchangeCodeForToken = async () => {
      try {
        const res = await axios.post("/.netlify/functions/auth", { code });
        const { access_token, refresh_token, expires_in } = res.data;

        localStorage.setItem("access_token", access_token);
        localStorage.setItem("refresh_token", refresh_token);
        localStorage.setItem("expires_in", expires_in);

        navigate("/dashboard");
      } catch (err) {
        console.error("Token exchange failed:", err);
        alert("Something went wrong during login.");
      }
    };

    exchangeCodeForToken();
  }, [navigate]);

  return <div>Logging in...</div>;
}
