import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-base-100 shadow-lg">
      <div className="container mx-auto flex justify-between items-center py-4">
        <h1 className="text-3xl font-bold text-primary">
          <span className="text-accent">Libra</span>Flick
        </h1>
        <div className="flex space-x-4">
          <Link
            to="/"
            className="text-base-content font-semibold hover:text-accent transition-all duration-300"
          >
            Home
          </Link>

          <Link
            to="/books"
            className="text-base-content font-semibold hover:text-accent transition-all duration-300"
          >
            Books
          </Link>

          <Link
            to="/movies"
            className="text-base-content font-semibold hover:text-accent transition-all duration-300"
          >
            Movies
          </Link>

          <Link
            to="/cart"
            className="text-base-content font-semibold hover:text-accent transition-all duration-300"
          >
            Cart
          </Link>

          <Link
            to="/ranking"
            className="text-base-content font-semibold hover:text-accent transition-all duration-300"
          >
            Ranking
          </Link>

          <Link
            to="/login"
            className="font-bold text-primary hover:text-accent transition-all duration-300"
          >
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
