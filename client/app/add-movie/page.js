"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function AddMovie() {
  const router = useRouter();
  const [isVerified, setIsVerified] = useState(false);
  const [adminLogin, setAdminLogin] = useState({ email: "", password: "" });
  const [movieData, setMovieData] = useState({
    title: "", description: "", image: "", rating: 0, category: "", releaseDate: ""
  });

  // 1. Sayfa yüklendiğinde hafızayı kontrol et (Zaten admin girişi yapılmış mı?)
  useEffect(() => {
    const userType = localStorage.getItem("userType");
    const token = localStorage.getItem("token");
    
    if (userType === "admin" && token) {
      setIsVerified(true);
    }
  }, []);

  // 2. Admin Giriş İşlemi (Eğer isVerified false ise bu çalışır)
  const handleAdminVerify = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", adminLogin);
      
      if (res.data.userType === "admin") {
        localStorage.setItem("token", res.data.accessToken);
        localStorage.setItem("userType", "admin");
        localStorage.setItem("username", res.data.username);
        setIsVerified(true); // Giriş başarılıysa formu göster
      } else {
        alert("This is not an admin account! Only admins can add movies.");
      }
    } catch (err) {
      alert("Invalid Admin Credentials!");
    }
  };

  // 3. Film Kaydetme İşlemi (Form açıldıktan sonra)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      await axios.post("http://localhost:5000/api/movies/add", 
        { ...movieData, rating: Number(movieData.rating) },
        { headers: { token: "Bearer " + token } }
      );
      alert("Movie added successfully!");
      router.push("/");
    } catch (err) {
      alert(err.response?.data || "Failed to add movie!");
    }
  };

  // --- EĞER ADMİN DEĞİLSE GÖSTERİLECEK GİRİŞ EKRANI ---
  if (!isVerified) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950">
        <form onSubmit={handleAdminVerify} className="bg-gray-900 p-8 rounded-xl border border-yellow-500/30 w-96 shadow-2xl">
          <h2 className="text-yellow-500 font-black mb-6 text-center text-xl tracking-widest uppercase italic">Admin Portal</h2>
          <p className="text-gray-400 text-xs text-center mb-6 uppercase tracking-tighter">Authentication required to add new content</p>
          
          <input 
            type="email" placeholder="Admin Email" required
            className="w-full p-3 mb-3 bg-black text-white border border-gray-800 rounded outline-none focus:border-yellow-500 transition-all"
            onChange={(e) => setAdminLogin({...adminLogin, email: e.target.value})}
          />
          <input 
            type="password" placeholder="Password" required
            className="w-full p-3 mb-6 bg-black text-white border border-gray-800 rounded outline-none focus:border-yellow-500 transition-all"
            onChange={(e) => setAdminLogin({...adminLogin, password: e.target.value})}
          />
          <button className="w-full bg-yellow-600 hover:bg-yellow-700 text-black font-black py-3 rounded transition-all uppercase tracking-widest shadow-lg">
            Verify Identity
          </button>
        </form>
      </div>
    );
  }

  // --- ADMİN DOĞRULANMIŞSA GÖSTERİLECEK FORM ---
  return (
    <div className="min-h-screen p-10 bg-gray-950 text-white flex justify-center">
      <div className="w-full max-w-2xl bg-gray-900 p-8 rounded-2xl border border-gray-800 shadow-2xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-black text-blue-500 uppercase italic tracking-tighter">Add New Movie</h1>
          <span className="bg-yellow-500/10 text-yellow-500 text-[10px] font-black px-2 py-1 rounded border border-yellow-500/20 uppercase">Admin Session Active</span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-gray-500 text-[10px] font-bold uppercase ml-1">Title</label>
            <input type="text" placeholder="Movie Title" required className="w-full p-3 bg-black border border-gray-800 rounded outline-none focus:border-blue-500" onChange={(e)=>setMovieData({...movieData, title:e.target.value})}/>
          </div>
          
          <div>
            <label className="text-gray-500 text-[10px] font-bold uppercase ml-1">Description</label>
            <textarea placeholder="Enter plot summary..." className="w-full p-3 bg-black border border-gray-800 rounded outline-none focus:border-blue-500 h-24" onChange={(e)=>setMovieData({...movieData, description:e.target.value})}/>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div>
               <label className="text-gray-500 text-[10px] font-bold uppercase ml-1">Rating</label>
               <input type="number" step="0.1" placeholder="8.5" className="w-full p-3 bg-black border border-gray-800 rounded outline-none focus:border-blue-500" onChange={(e)=>setMovieData({...movieData, rating:e.target.value})}/>
             </div>
             <div>
               <label className="text-gray-500 text-[10px] font-bold uppercase ml-1">Category</label>
               <input type="text" placeholder="Sci-Fi, Action" className="w-full p-3 bg-black border border-gray-800 rounded outline-none focus:border-blue-500" onChange={(e)=>setMovieData({...movieData, category:e.target.value})}/>
             </div>
          </div>

          <div>
            <label className="text-gray-500 text-[10px] font-bold uppercase ml-1">Poster Image URL</label>
            <input type="text" placeholder="https://..." required className="w-full p-3 bg-black border border-gray-800 rounded outline-none focus:border-blue-500" onChange={(e)=>setMovieData({...movieData, image:e.target.value})}/>
          </div>

          <div>
            <label className="text-gray-500 text-[10px] font-bold uppercase ml-1">Release Year</label>
            <input type="text" placeholder="2026" className="w-full p-3 bg-black border border-gray-800 rounded outline-none focus:border-blue-500" onChange={(e)=>setMovieData({...movieData, releaseDate:e.target.value})}/>
          </div>

          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 py-4 rounded font-black uppercase tracking-widest transition-all shadow-xl mt-4">
            Save Movie to Database
          </button>
        </form>
      </div>
    </div>
  );
}