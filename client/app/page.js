const movies = [
  {
    id: 1,
    title: "Inception",
    rating: 8.8,
    image: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_.jpg",
    category: "Sci-Fi"
  },
  {
    id: 2,
    title: "The Dark Knight",
    rating: 9.0,
    image: "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_.jpg",
    category: "Action"
  },
  {
    id: 3,
    title: "Interstellar",
    rating: 8.7,
    image: "https://m.media-amazon.com/images/M/MV5BYzdjMDAxZGItMjI2My00ODA1LTlkNzItOWFjMDU5ZDJlYWY3XkEyXkFqcGc@._V1_.jpg",
    category: "Sci-Fi"
  },
  {
    id: 4,
    title: "Pulp Fiction",
    rating: 8.9,
    image: "https://upload.wikimedia.org/wikipedia/tr/thumb/f/fa/Pulp_Fiction_%28film%2C_1994%29.jpg/250px-Pulp_Fiction_%28film%2C_1994%29.jpg",
    category: "Crime"
  },
  {
    id: 5,
    title: "The Godfather",
    rating: 9.2,
    image: "https://m.media-amazon.com/images/M/MV5BNGEwYjgwOGQtYjg5ZS00Njc1LTk2ZGEtM2QwZWQ2NjdhZTE5XkEyXkFqcGc@._V1_.jpg",
    category: "Drama"
  }
];
export default function Home() {
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
        
        {/* İşte Burası! Map fonksiyonu ile filmleri dizeceğimiz grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {movies.map((movie) => (
            <div key={movie.id} className="group cursor-pointer">
              {/* Film Afişi */}
              <div className="relative overflow-hidden rounded-xl h-80 mb-3 border border-gray-800 group-hover:border-blue-500 transition-all duration-300">
                <img 
                  src={movie.image} 
                  alt={movie.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {/* Puan Badge */}
                <div className="absolute top-2 right-2 bg-yellow-500 text-black text-xs font-bold px-2 py-1 rounded shadow-lg">
                  ★ {movie.rating}
                </div>
              </div>

              {/* Film Bilgisi */}
              <h3 className="text-white font-semibold truncate group-hover:text-blue-500 transition">
                {movie.title}
              </h3>
              <p className="text-gray-500 text-xs mt-1 uppercase tracking-wider">{movie.category}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}