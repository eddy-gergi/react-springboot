import React from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import MainPage from "./pages/MainPage";
import AllMoviesPage from "./pages/movies/AllMoviesPage";
import AllBooksPage from "./pages/books/AllBooksPage";
import CartPage from "./pages/actions/CartPage";
import RankingPage from "./pages/actions/RankingPage";
import LoginPage from "./pages/auth/LoginPage";
import SignUpPage from "./pages/auth/SignUpPage";
import Footer from "./components/Footer";
import AdminLoginPage from "./pages/admin/AdminLoginPage";
import AdminPage from "./pages/admin/AdminPage";
import BookComponent from "./pages/books/BookComponent";
import MovieComponent from "./pages/movies/MovieComponent";
import AddMovieForm from "./components/admin/AddMovieForm";
import AddBookForm from "./components/admin/AddBookForm";
import AddAdminForm from "./components/admin/AddAdminForm";
import SearchPage from "./pages/actions/SearchPage";

const AppContent = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin-dashboard');

  return (
    <div className="flex flex-col min-h-screen">
      {!isAdminRoute && <Navbar />}

      <main className="flex-1 container mx-auto px-4">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/movies" element={<AllMoviesPage />} />
          <Route path="/books" element={<AllBooksPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/ranking" element={<RankingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/book/:id" element={<BookComponent />} />
          <Route path="/movie/:id" element={<MovieComponent />} />
          <Route path="/adminlogin" element={<AdminLoginPage />} />
          <Route path="/admin-dashboard" element={<AdminPage />} />
          <Route path="/admin-dashboard/add-movie" element={<AddMovieForm />} />
          <Route path="/admin-dashboard/add-book" element={<AddBookForm />} />
          <Route path="/admin-dashboard/add-admin" element={<AddAdminForm />} />
          <Route path="/search" element={<SearchPage/>} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
