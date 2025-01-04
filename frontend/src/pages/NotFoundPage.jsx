import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-base-100 text-center">
      <div className="text-6xl text-red-500 mb-6">😢</div>
      <h1 className="text-4xl font-bold text-gray-500 mb-4">404 - Page Not Found</h1>
      <p className="text-lg text-gray-600 mb-6">
        Oops! The page you're looking for doesn't exist.
      </p>
      <button
        onClick={() => navigate('/')}
        className="btn btn-primary text-white rounded-lg px-6 py-3 mt-4"
      >
        Go Back to Home
      </button>
    </div>
  );
};

export default NotFoundPage;
