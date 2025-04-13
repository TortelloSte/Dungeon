import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (email && password) {
      localStorage.setItem("user", JSON.stringify({ email }));
      navigate("/dashboard");
    } else {
      alert("Please enter both email and password");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-black text-white px-4">
      <h1 className="text-4xl font-bold mb-6">Login to Dungeon Crawler</h1>
      <form
        onSubmit={handleLogin}
        className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-sm space-y-4"
      >
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none"
        />
        <button
          type="submit"
          className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-2 rounded transition"
        >
          Log In
        </button>
        <p className="text-sm text-gray-400 text-center">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-yellow-400 hover:underline">
            Sign up
          </Link>
        </p>
      </form>
      <Link to="/" className="mt-6 text-sm text-yellow-400 hover:underline">
        ← Back to home
      </Link>
    </div>
  );
}
