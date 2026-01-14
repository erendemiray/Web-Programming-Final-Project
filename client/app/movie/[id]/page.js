"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "next/navigation";


export default function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const username = typeof window !== "undefined" ? localStorage.getItem("username") : null;

  useEffect(() => {
    const fetchData = async () => {
      const movieRes = await axios.get(`http://localhost:5000/api/movies`); // Basitlik için tümünden filtreleyebilirsin veya tekli rota yazabilirsin
      const found = movieRes.data.find(m => m._id === id);
      setMovie(found);

      const commentRes = await axios.get(`http://localhost:5000/api/comments/${id}`);
      setComments(commentRes.data);
    };
    fetchData();
  }, [id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!username) return alert("Lütfen önce giriş yapın!");

    try {
      const res = await axios.post("http://localhost:5000/api/comments/add", {
        movieId: id,
        username: username,
        content: newComment
      });
      setComments([res.data, ...comments]);
      setNewComment("");
    } catch (err) {
      alert("Yorum gönderilemedi.");
    }
  };

  if (!movie) return <div className="text-white p-10">Yükleniyor...</div>;

  return (
  <div className="min-h-screen bg-gray-950 text-white font-sans">
    <div className="container mx-auto px-6 py-12">
      
      {/* ANA TAYYİP (Container) */}
      <div className="flex flex-col md:flex-row gap-12 items-start"> 
        
        {/* SOL TARAF: RESİM (Sabitlendi ve Uzaması Engellendi) */}
        <div className="w-full md:w-80 shrink-0 sticky top-24"> 
          <img 
            src={movie.image} 
            alt={movie.title} 
            className="w-full h-[450px] object-cover rounded-2xl shadow-2xl border border-gray-800"
          />
        </div>

        {/* SAĞ TARAF: DETAYLAR VE YORUMLAR */}
        <div className="flex-1 w-full">
          {/* Film Bilgileri */}
          <div className="mb-10">
            <h1 className="text-6xl font-black text-blue-500 uppercase italic tracking-tighter mb-4">
              {movie.title}
            </h1>
            <div className="flex items-center gap-4 mb-6">
              <span className="bg-yellow-500 text-black font-black px-3 py-1 rounded text-sm italic">
                SCORE: {movie.rating}
              </span>
              <span className="text-gray-500 font-bold uppercase tracking-widest text-sm italic">
                {movie.category}
              </span>
            </div>
            <p className="text-xl text-gray-400 italic leading-relaxed border-l-4 border-gray-800 pl-6">
              {movie.description}
            </p>
          </div>

          {/* Yorum Yapma Alanı */}
          <div className="mt-16">
            <h2 className="text-3xl font-black uppercase italic mb-8 border-b border-gray-800 pb-2">Comments</h2>
            
            <form onSubmit={handleCommentSubmit} className="mb-10 bg-gray-900/50 p-6 rounded-2xl border border-gray-800">
              <textarea
                className="w-full p-4 bg-black border border-gray-800 rounded-xl outline-none focus:border-blue-500 transition-all text-white h-24 italic"
                placeholder={username ? `${username} olarak yorum yaz...` : "Giriş yapmalısın..."}
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                disabled={!username}
              />
              <button className="mt-4 bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-lg font-black uppercase transition-all shadow-lg">
                Post Comment
              </button>
            </form>

            {/* Yorum Listesi */}
            <div className="space-y-4">
              {comments.map((c) => (
                <div key={c._id} className="bg-gray-900/20 p-5 rounded-xl border border-gray-800">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-blue-400 font-black uppercase italic text-sm">{c.username}</span>
                    <span className="text-gray-600 text-[10px] font-bold uppercase">
                      {new Date(c.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-gray-300 italic text-sm">{c.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
);
}