import React, { useState } from "react";

const InstagramFollowers = () => {
  const [followers, setFollowers] = useState([]);
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const apiKey = import.meta.env.VITE_INSTAGRAM_API_KEY; // store your key in .env

  const fetchFollowers = async () => {
    if (!username) {
      setError("Please enter a username.");
      return;
    }
    setLoading(true);
    setError("");
    setFollowers([]);

    try {
      const res = await fetch(
        `https://instagram-premium-api-2023.p.rapidapi.com/v1/user/followers?username=${username}&amount=20`,
        {
          method: "GET",
          headers: {
            "x-rapidapi-key": apiKey,
            "x-rapidapi-host": "instagram-premium-api-2023.p.rapidapi.com",
          },
        }
      );

      if (!res.ok) throw new Error("Failed to fetch data");
      const data = await res.json();
      setFollowers(data?.followers || []);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Instagram Followers</h2>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Enter Instagram username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="flex-1 border rounded px-3 py-2"
        />
        <button
          onClick={fetchFollowers}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Search
        </button>
      </div>

      {loading && <p>Loading followers...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <ul className="space-y-3">
        {followers.map((f, idx) => (
          <li key={idx} className="flex items-center gap-3 border p-2 rounded">
            <img
              src={f.profile_pic_url}
              alt={f.username}
              className="w-12 h-12 rounded-full"
            />
            <div>
              <p className="font-semibold">{f.username}</p>
              <p className="text-sm text-gray-500">{f.full_name}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InstagramFollowers;
