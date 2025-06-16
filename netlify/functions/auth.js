const axios = require("axios");

exports.handler = async (event) => {
  try {
    const { code } = JSON.parse(event.body);

    const client_id = process.env.SPOTIFY_CLIENT_ID;
    const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
    const redirect_uri = "https://moodifyinc.netlify.app/callback"; 

    const tokenEndpoint = "https://accounts.spotify.com/api/token";

    const response = await axios.post(
      tokenEndpoint,
      new URLSearchParams({
        grant_type: "authorization_code",
        code,
        redirect_uri,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization:
            "Basic " +
            Buffer.from(client_id + ":" + client_secret).toString("base64"),
        },
      }
    );

    return {
      statusCode: 200,
      body: JSON.stringify({
        access_token: response.data.access_token,
        refresh_token: response.data.refresh_token,
        expires_in: response.data.expires_in,
      }),
    };
  } catch (err) {
    console.error("Token exchange failed:", err.response?.data || err.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Token exchange failed" }),
    };
  }
};
