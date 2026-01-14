"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";


export default function Home() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // Arama terimi için state

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/movies");
        setMovies(res.data);
      } catch (err) {
        console.error("Filmler yüklenirken hata oluştu:", err);
      }
    };
    fetchMovies();
  }, []);

  // Filmleri arama terimine göre filtrele (Title veya Category üzerinden)
  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    movie.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-950 text-white font-sans">

      
      <main className="container mx-auto px-6 py-12">
        {/* HERO SECTION & SEARCH BAR */}
        <div className="flex flex-col items-center mb-16">
          <h1 className="text-6xl font-black italic tracking-tighter uppercase mb-8 text-center">
            Find Your Next <span className="text-blue-500">Masterpiece</span>
          </h1>
          
          <div className="w-full max-w-2xl relative">
            <input
              type="text"
              placeholder="Search movies by title or genre..."
              className="w-full p-5 pl-12 bg-gray-900 border border-gray-800 rounded-2xl outline-none focus:border-blue-500 transition-all text-lg italic shadow-2xl"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-xl">
              🔍
            </span>
          </div>
        </div>

        {/* MOVIE GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredMovies.length > 0 ? (
            filteredMovies.map((movie) => (
              <Link key={movie._id} href={`/movie/${movie._id}`}>
                <div className="group bg-gray-900 rounded-2xl overflow-hidden border border-gray-800 hover:border-blue-500 transition-all duration-300 shadow-lg cursor-pointer">
                  <div className="relative overflow-hidden aspect-[2/3]">
                    <img
                      src={movie.image}
                      alt={movie.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4 bg-yellow-500 text-black font-black px-2 py-1 rounded text-xs italic">
                      {movie.rating}
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-xl font-bold uppercase italic tracking-tighter group-hover:text-blue-400 transition-colors">
                      {movie.title}
                    </h3>
                    <p className="text-gray-500 text-sm font-bold uppercase tracking-widest mt-1">
                      {movie.category}
                    </p>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="col-span-full text-center py-20">
              <p className="text-gray-600 font-black italic uppercase text-2xl">
                No movies found matching "{searchTerm}"
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}