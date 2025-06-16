import React from "react";

export default function Login() {
  const clientId = "aed7c132277c4daba86f50210d48a5a5";
  const redirectUri = "https://moodifyinc.netlify.app/callback";
  const scopes = [
    "user-top-read",
    "playlist-modify-public",
    "playlist-modify-private",
  ];

  const handleLogin = () => {
    const scopeParam = scopes.join(" ");
    const authUrl = `https://accounts.spotify.com/authorize?response_type=code&client_id=${clientId}&scope=${encodeURIComponent(scopeParam)}&redirect_uri=${encodeURIComponent(redirectUri)}`;
    window.location.href = authUrl;
  };

  return (
    <div style={{ textAlign: "center", marginTop: "10rem" }}>
      <h1>🎧 Moodify</h1>
      <p>Get your mood-based playlist from Spotify.</p>
      <button onClick={handleLogin}>Login with Spotify</button>
    </div>
  );
}
