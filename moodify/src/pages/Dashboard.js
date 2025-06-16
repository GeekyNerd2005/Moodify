import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("spotify_access_token");

    if (!token) {
      alert("No access token. Please log in.");
      return;
    }

    const fetchProfile = async () => {
      try {
        const res = await axios.get("https://api.spotify.com/v1/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProfile(res.data);
      } catch (err) {
        console.error("Failed to fetch profile:", err);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div>
      <h1>🎧 Dashboard</h1>
      {profile ? (
        <pre>{JSON.stringify(profile, null, 2)}</pre>
      ) : (
        "Loading profile..."
      )}
    </div>
  );
}
