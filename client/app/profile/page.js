"use client";
import { useState, useEffect } from "react";
import axios from "axios";


export default function ProfilePage() {
  const [userComments, setUserComments] = useState([]);
  const [loading, setLoading] = useState(true);

  // LocalStorage'dan kullanıcı bilgilerini al
  const username = typeof window !== "undefined" ? localStorage.getItem("username") : null;
  const userType = typeof window !== "undefined" ? localStorage.getItem("userType") : null;

  useEffect(() => {
    const fetchUserComments = async () => {
      if (!username) return;
      try {
        const res = await axios.get(`http://localhost:5000/api/comments/user/${username}`);
        setUserComments(res.data);
      } catch (err) {
        console.error("Yorumlar yüklenirken hata oluştu:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUserComments();
  }, [username]);

  if (!username) return <div className="min-h-screen bg-black text-white p-20">Lütfen önce giriş yapın.</div>;

  return (
    <div className="min-h-screen bg-gray-950 text-white font-sans">      
      <div className="container mx-auto px-6 py-12">
        {/* PROFİL BAŞLIK */}
        <div className="bg-gray-900 p-10 rounded-3xl border border-gray-800 mb-12 flex items-center gap-8 shadow-2xl">
          <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center text-4xl font-black italic border-4 border-gray-800">
            {username[0].toUpperCase()}
          </div>
          <div>
            <h1 className="text-5xl font-black italic uppercase tracking-tighter text-blue-500">{username}</h1>
            <p className="text-gray-500 font-bold uppercase tracking-widest text-sm mt-1">
              Role: <span className={userType === 'admin' ? 'text-yellow-500' : 'text-blue-400'}>{userType}</span>
            </p>
          </div>
        </div>

        {/* KULLANICI YORUMLARI (MY REVIEWS) */}
        <div className="max-w-4xl">
          <h2 className="text-3xl font-black uppercase italic tracking-tighter mb-8 border-b-4 border-blue-600 inline-block pb-2">
            My Movie Reviews
          </h2>

          <div className="grid gap-6">
            {loading ? (
              <p>Yükleniyor...</p>
            ) : userComments.length === 0 ? (
              <p className="text-gray-600 italic font-bold uppercase">Henüz hiç yorum yapmamışsın.</p>
            ) : (
              userComments.map((comment) => (
                <div key={comment._id} className="bg-gray-900/50 p-6 rounded-2xl border border-gray-800 hover:border-blue-500/50 transition-all">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-blue-400 font-black uppercase italic text-lg">
                      {comment.movieId?.title || "Unknown Movie"}
                    </h3>
                    <span className="text-gray-600 text-xs font-bold uppercase">
                      {new Date(comment.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-gray-300 italic text-lg leading-snug">"{comment.content}"</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}