"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("username");
    const userType = localStorage.getItem("userType"); 
    
    if (storedUser) {
      setUser(storedUser);
      setIsAdmin(userType === "admin");
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/"; 
  };

  return (
    <nav className="bg-black border-b border-gray-800 p-4 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo ve Add Movie */}
        <div className="flex items-center space-x-8">
          <Link href="/" className="text-2xl font-extrabold text-blue-500 tracking-tighter italic">
            FILMCRITIC
          </Link>

          <div className="flex items-center">
            <Link href="/add-movie" className="text-yellow-500 hover:text-yellow-400 font-bold border border-yellow-500/20 px-3 py-1.5 rounded bg-yellow-500/5 transition text-xs uppercase tracking-widest">
              + Add Movie
            </Link>
          </div>
        </div>

        {/* Profil Kısmı */}
        <div className="flex items-center space-x-4">
          {user ? (
            <div className="flex items-center space-x-6">
              {/* Dashboard/Profile Linki (İsim ve Rol) */}
              <Link href="/profile" className="flex flex-col items-end hover:opacity-80 transition cursor-pointer">
                <span className="text-white text-xs font-bold">{user}</span>
                <span className={`text-[9px] uppercase font-black tracking-tighter ${isAdmin ? 'text-yellow-500' : 'text-blue-400'}`}>
                  {isAdmin ? 'Administrator' : 'Movie Critic'}
                </span>
              </Link>
              
              <div className="relative group">
                {/* Dashboard/Profile Linki (Avatar) */}
                <Link href="/profile">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-black cursor-pointer border-2 border-gray-800 transition shadow-lg hover:scale-105 ${isAdmin ? 'bg-amber-600' : 'bg-blue-600'}`}>
                    {user[0].toUpperCase()}
                  </div>
                </Link>

                {/* Logout Butonu */}
                <button 
                  onClick={handleLogout}
                  className="absolute top-12 right-0 bg-red-600 hover:bg-red-700 text-white text-[10px] font-bold px-3 py-1.5 rounded shadow-xl opacity-0 group-hover:opacity-100 transition-all whitespace-nowrap uppercase tracking-tighter z-50"
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Link href="/login" className="text-gray-400 hover:text-white text-xs font-bold uppercase tracking-widest transition">
                Sign In
              </Link>
              <Link href="/register" className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg text-xs font-black transition uppercase tracking-widest shadow-lg">
                Join Now
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}