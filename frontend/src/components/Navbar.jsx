import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const userId = sessionStorage.getItem("userId");

  const handleLogout = () => {
    sessionStorage.removeItem("userId");
    navigate("/login"); 
  };

  return (
    <nav className="bg-base-100 shadow-lg">
      <div className="container mx-auto flex justify-between items-center py-4">
        <h1 className="text-3xl font-bold text-primary cursor-pointer" onClick={() => navigate("/")}>
          <span className="text-accent cursor-pointer">Libra</span>Flick
        </h1>

        <div className="flex space-x-4">
          {[{ to: "/", label: "Home" },
            { to: "/books", label: "Books" },
            { to: "/movies", label: "Movies" },
            { to: "/cart", label: "Cart" },
            { to: "/ranking", label: "Ranking" },
            { to: "/search", label: "Search" },
          ].map((link) => (
            <Link
              key={link.label}
              to={link.to}
              className="relative text-base-content font-semibold group transition-all duration-300"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-primary via-secondary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-500 scale-100 group-hover:scale-110 rounded-md"></span>
              <span className="relative z-10 group-hover:text-white transition-colors duration-300 px-3 py-2">
                {link.label}
              </span>
            </Link>
          ))}

          
          {userId ? (
            <button
              onClick={handleLogout}
              className="relative text-base-content font-semibold group transition-all duration-300"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-primary via-secondary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-500 scale-100 group-hover:scale-110 rounded-md"></span>
              <span className="relative z-10 group-hover:text-white transition-colors duration-300 px-3 py-2">
                Logout
              </span>
            </button>
          ) : (
            <Link
              to="/login"
              className="relative text-base-content font-semibold group transition-all duration-300"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-primary via-secondary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-500 scale-100 group-hover:scale-110 rounded-md"></span>
              <span className="relative z-10 group-hover:text-white transition-colors duration-300 px-3 py-2">
                Login
              </span>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
