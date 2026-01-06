"use client";
import { useState } from "react";
import axios from "axios"; // Import Axios

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    try {
      // Send request to our backend server (Port 5000)
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email: email,
        password: password
      });

      console.log("Login Success! Token:", res.data.accessToken);
      alert("Login Successful! Check console for token.");
      
      // We will save the token to local storage later
    } catch (err) {
      console.error("Login Error:", err.response?.data);
      setError(err.response?.data || "Something went wrong!");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900 text-white">
      <form onSubmit={handleLogin} className="bg-gray-800 p-8 rounded-xl shadow-2xl w-96">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-500">Login</h2>
        
        {error && <p className="bg-red-500 text-white p-2 rounded mb-4 text-sm">{error}</p>}

        <div className="mb-4">
          <label className="block text-sm mb-2 font-medium">Email Address</label>
          <input 
            type="email" 
            className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:border-blue-500 focus:outline-none"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm mb-2 font-medium">Password</label>
          <input 
            type="password" 
            className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:border-blue-500 focus:outline-none"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="w-full bg-blue-600 py-2 rounded font-bold hover:bg-blue-700 transition">
          Sign In
        </button>
      </form>
    </div>
  );
}