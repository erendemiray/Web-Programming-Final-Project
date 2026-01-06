"use client";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-black border-b border-gray-800 p-4 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-2xl font-extrabold text-blue-500 tracking-tighter">
          FILMCRITIC
        </Link>

        {/* Kategoriler */}
        <div className="hidden md:flex space-x-6 text-gray-300 font-medium">
          <Link href="/popular" className="hover:text-white transition">Popular</Link>
          <Link href="/top-rated" className="hover:text-white transition">Top Rated</Link>
          <Link href="/categories" className="hover:text-white transition">Categories</Link>
        </div>

        {/* Auth Butonları */}
        <div className="flex space-x-4">
          <Link href="/login" className="text-gray-300 hover:text-white pt-2 text-sm font-medium">
            Sign In
          </Link>
          <Link href="/register" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-bold transition">
            Join Now
          </Link>
        </div>
      </div>
    </nav>
  );
}