import { Menu, Award, X } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="shadow-2xs max-w-7xl rounded mx-auto relative">
      <div className="flex justify-between items-center p-4 border-b border-b-gray-200">
        <div className="font-bold flex items-center gap-1">
          <Award />
          <Link to="/" className="cursor-pointer">
            Statline
          </Link>
        </div>

        <ul className="hidden sm:flex flex-row gap-6 cursor-pointer font-bold">
          <li>
            <Link to="/games">Games</Link>
          </li>
          <li>
            <Link to="/players">Players</Link>
          </li>
          <li>
            <Link to="/teams">Teams</Link>
          </li>
        </ul>

        <button
          className="sm:hidden p-2 rounded-full hover:bg-gray-100 transition"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <div
        className={`sm:hidden overflow-hidden transition-all duration-300 ${
          open ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="flex flex-col gap-4 p-5 font-bold border-b border-gray-200 bg-white rounded-b">
          <li>
            <Link
              to="/games"
              onClick={() => setOpen(false)}
              className="block hover:text-gray-500 transition"
            >
              Games
            </Link>
          </li>

          <li>
            <Link
              to="/players"
              onClick={() => setOpen(false)}
              className="block hover:text-gray-500 transition"
            >
              Players
            </Link>
          </li>

          <li>
            <Link
              to="/teams"
              onClick={() => setOpen(false)}
              className="block hover:text-gray-500 transition"
            >
              Teams
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
