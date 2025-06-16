// src/Login.js
export default function Login() {
  const clientId = "aed7c132277c4daba86f50210d48a5a5";
  const redirectUri = "http://127.0.0.1:3000/";
  const scopes = [
    "user-top-read",
    "playlist-modify-public",
    "playlist-modify-private",
  ];

    const handleLogin = () => {
    const scope = scopes.join("%20");
    const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=token&show_dialog=true`;
    console.log("🔗 AUTH URL:", authUrl);
    alert("Redirecting to Spotify...");  // ← Add this
    window.location.assign(authUrl);
    };


  return (
    <div style={{ textAlign: "center", marginTop: "10rem" }}>
      <h1>🎵 Moodify Auth Test</h1>
      <button onClick={handleLogin}>Login with Spotify</button>
    </div>
  );
}
