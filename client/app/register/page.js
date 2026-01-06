"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation"; // To redirect after success

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      // Send request to the Register endpoint we created earlier
      await axios.post("http://localhost:5000/api/auth/register", {
        username,
        email,
        password,
      });
      
      alert("Registration successful! Redirecting to login...");
      router.push("/login"); // Send user to login page
    } catch (err) {
      console.error("Register Error:", err.response?.data);
      alert("Registration failed!");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900 text-white">
      <form onSubmit={handleRegister} className="bg-gray-800 p-8 rounded-xl w-96 shadow-2xl">
        <h2 className="text-2xl font-bold mb-6 text-center text-green-500">Create Account</h2>
        
        <input 
          type="text" placeholder="Username" required
          className="w-full p-2 mb-4 rounded bg-gray-700 border border-gray-600 focus:border-green-500 outline-none"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input 
          type="email" placeholder="Email" required
          className="w-full p-2 mb-4 rounded bg-gray-700 border border-gray-600 focus:border-green-500 outline-none"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input 
          type="password" placeholder="Password" required
          className="w-full p-2 mb-6 rounded bg-gray-700 border border-gray-600 focus:border-green-500 outline-none"
          onChange={(e) => setPassword(e.target.value)}
        />
        
        <button type="submit" className="w-full bg-green-600 py-2 rounded font-bold hover:bg-green-700 transition">
          Register
        </button>
        
        <p className="mt-4 text-sm text-center text-gray-400">
          Already have an account? <a href="/login" className="text-blue-400 underline">Login here</a>
        </p>
      </form>
    </div>
  );
}