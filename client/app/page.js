"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        // Backend'deki get movies rotasına istek atıyoruz
        const res = await axios.get("http://localhost:5000/api/movies");
        setMovies(res.data);
      } catch (err) {
        console.error("Filmler yüklenirken hata oluştu:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  return (
    <main className="bg-gray-950 min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[400px] flex items-center justify-center bg-gradient-to-b from-blue-900/20 to-gray-950">
        <div className="text-center">
          <h1 className="text-5xl font-black text-white mb-2 tracking-tighter">DISCOVER MOVIES</h1>
          <p className="text-gray-400 mb-6">Rate, review and explore your favorites.</p>
        </div>
      </div>

      {/* Film Listesi Alanı */}
      <div className="container mx-auto px-4 pb-20">
        <h2 className="text-xl font-bold text-white mb-8 border-l-4 border-blue-500 pl-3">
          Popular Movies
        </h2>
        
        {loading ? (
          <div className="text-white text-center py-10">Filmler yükleniyor...</div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {movies.map((movie) => (
              <Link href={`/movie/${movie._id}`} key={movie._id} className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-xl h-80 mb-3 border border-gray-800 group-hover:border-blue-500 transition-all duration-300">
                  <img 
                    src={movie.image} 
                    alt={movie.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-2 right-2 bg-yellow-500 text-black text-xs font-bold px-2 py-1 rounded shadow-lg">
                    ★ {movie.rating}
                  </div>
                </div>

                <h3 className="text-white font-semibold truncate group-hover:text-blue-500 transition">
                  {movie.title}
                </h3>
                <p className="text-gray-500 text-xs mt-1 uppercase tracking-wider">{movie.category}</p>
              </Link>
            ))}
          </div>
        )}

        {movies.length === 0 && !loading && (
          <div className="text-gray-500 text-center py-10 underline">
            Henüz film eklenmemiş. Admin panelinden film eklemeyi dene!
          </div>
        )}
      </div>
    </main>
  );
}