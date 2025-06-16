import { useEffect, useState } from "react";
import Login from "./Login";

function App() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const params = new URLSearchParams(hash.substring(1));
      const _token = params.get("access_token");
      if (_token) {
        setToken(_token);
        localStorage.setItem("spotifyToken", _token);
        window.location.hash = ""; // clear the token from URL
      }
    }
  }, []);

  return (
    <div>
      {token ? (
        <h2>🎧 Logged In! Token: {token.slice(0, 20)}...</h2>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default App;
