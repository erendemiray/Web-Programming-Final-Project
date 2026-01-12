"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Giriş bilgilerini kontrol et
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
        {/* Logo ve Linkler */}
        <div className="flex items-center space-x-8">
          <Link href="/" className="text-2xl font-extrabold text-blue-500 tracking-tighter">
            FILMCRITIC
          </Link>

          <div className="hidden md:flex space-x-6 text-gray-300 font-medium">
            <Link href="/" className="hover:text-white transition">Popular</Link>
            
            {/* Buton artık her zaman görünür durumda */}
            <Link href="/add-movie" className="text-yellow-500 hover:text-yellow-400 font-bold border border-yellow-500/20 px-2 py-1 rounded bg-yellow-500/5 transition text-sm">
              + Add Movie
            </Link>
          </div>
        </div>

        {/* Auth / Profil Kısmı */}
        <div className="flex items-center space-x-4">
          {user ? (
            <div className="flex items-center space-x-4">
              <div className="flex flex-col items-end">
                <span className="text-white text-xs font-bold">{user}</span>
                <span className={`text-[10px] uppercase font-black ${isAdmin ? 'text-yellow-500' : 'text-blue-400'}`}>
                  {isAdmin ? 'Admin' : 'Member'}
                </span>
              </div>
              
              <div className="relative group">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold cursor-pointer border-2 border-gray-800 transition ${isAdmin ? 'bg-amber-600' : 'bg-blue-600'}`}>
                  {user[0].toUpperCase()}
                </div>
                <button 
                  onClick={handleLogout}
                  className="absolute top-12 right-0 bg-red-600 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap"
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <>
              <Link href="/login" className="text-gray-300 hover:text-white pt-2 text-sm font-medium">
                Sign In
              </Link>
              <Link href="/register" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-bold transition">
                Join Now
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}