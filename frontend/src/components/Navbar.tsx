import { Menu, Award } from "lucide-react";
import { Link } from "@tanstack/react-router";

export default function Navbar() {
  return (
    <nav className="shadow-2xs max-w-7xl rounded mx-auto">
      <div className="flex justify-between p-4 border-b border-b-gray-200">
        <div className="font-bold flex flex-row gap-1">
          <Award />
          <Link to="/" className="cursor-pointer">
            Bench
          </Link>
        </div>
        <ul className="hidden sm:flex flex-row gap-4 cursor-pointer font-bold">
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
        <Menu className="sm:hidden cursor-pointer" />
      </div>
    </nav>
  );
}
