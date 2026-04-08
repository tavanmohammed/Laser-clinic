import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/Logo.png";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { name: "Services", path: "/services" },
    { name: "Skin Concerns", path: "/skin-concerns" },
    { name: "About", path: "/about" },
    { name: "Book", path: "/book" },
    { name: "Gallery", path: "/gallery" },
  ];

  return (
    <header className="w-full bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 lg:px-10 py-4 flex items-center justify-between">

        {/* LOGO */}
        <Link to="/" className="flex items-center">
          <img
            src={logo}
            alt="logo"
            className="h-[150px] md:h-[200px] lg:h-[200px] object-contain"
          />
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden lg:flex items-center gap-8 text-sm text-gray-700">
          {links.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="hover:text-black transition"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* DESKTOP BUTTON */}
        <Link
          to="/book"
          className="hidden lg:block bg-[#e89c7c] text-white px-5 py-2 rounded-md text-sm font-medium hover:opacity-90"
        >
          Book Appointment
        </Link>

        {/* MOBILE MENU BUTTON */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden text-3xl text-gray-700"
        >
          {menuOpen ? "×" : "☰"}
        </button>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200 px-6 py-6 space-y-4">
          {links.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setMenuOpen(false)}
              className="block text-gray-700 text-base"
            >
              {link.name}
            </Link>
          ))}

          <Link
            to="/book"
            onClick={() => setMenuOpen(false)}
            className="block mt-4 bg-[#e89c7c] text-white text-center py-3 rounded-md"
          >
            Book Appointment
          </Link>
        </div>
      )}
    </header>
  );
}