"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Önceki hatayı temizle

    try {
      //  email ve password'ü bir obje içinde gönderiyoruz
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      // BİLGİLERİ KAYDEDİYORUZ
      localStorage.setItem("token", res.data.accessToken);
      localStorage.setItem("username", res.data.username);
      localStorage.setItem("userType", res.data.userType);

      // Başarılı giriş bildirimi
      alert(res.data.message || "Giriş başarılı!");

      // Yönlendirme
      window.location.href = "/";
    } catch (err) {
      // Backend'den gelen hata mesajını göster veya genel hata ver
      const msg = err.response?.data || "Giriş bilgileri hatalı!";
      setError(typeof msg === 'string' ? msg : "Giriş başarısız!");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-950 text-white">
      <form onSubmit={handleLogin} className="bg-gray-900 p-8 rounded-xl border border-gray-800 shadow-2xl w-96">
        <h2 className="text-3xl font-black mb-6 text-center text-blue-500 uppercase tracking-tighter italic">Login</h2>
        
        {error && (
          <p className="bg-red-500/10 border border-red-500 text-red-500 p-2 rounded mb-4 text-xs font-bold text-center">
            {error}
          </p>
        )}

        <div className="mb-4">
          <label className="block text-xs mb-2 font-bold uppercase text-gray-500">Email Address</label>
          <input 
            type="email" 
            className="w-full p-3 rounded bg-black border border-gray-800 focus:border-blue-500 focus:outline-none transition"
            placeholder="email@example.com"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-xs mb-2 font-bold uppercase text-gray-500">Password</label>
          <input 
            type="password" 
            className="w-full p-3 rounded bg-black border border-gray-800 focus:border-blue-500 focus:outline-none transition"
            placeholder="••••••••"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="w-full bg-blue-600 py-3 rounded font-black hover:bg-blue-700 transition uppercase tracking-widest shadow-lg">
          Sign In
        </button>
        
        <p className="mt-6 text-xs text-center text-gray-500 uppercase font-bold">
          Don't have an account? <a href="/register" className="text-blue-500 hover:text-blue-400 underline ml-1">Register here</a>
        </p>
      </form>
    </div>
  );
}
