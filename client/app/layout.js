import "./globals.css";
// client/app/layout.js içinde
import Navbar from "../components/navbar"; // işareti doğrudan proje kökünü (client) temsil eder

export const metadata = {
  title: "FilmCritic",
  description: "Review your favorite movies",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-950">
        <Navbar /> {/* Navbar her zaman en üstte kalacak */}
        {children}
      </body>
    </html>
  );
}