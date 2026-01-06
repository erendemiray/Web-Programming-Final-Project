// client/app/layout.js
import "./globals.css";

export const metadata = {
  title: "FilmCritic",
  description: "Your movie platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}