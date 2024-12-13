// components/SignOutButton.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const SignOutButton = () => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    console.log("Signing out...");
    alert("Signed out successfully!");
    navigate("/");
  };

  return (
    <button
      onClick={handleSignOut}
      className="btn bg-red-500 text-white mt-4 rounded py-2 px-4 hover:bg-red-600"
    >
      Sign Out
    </button>
  );
};

export default SignOutButton;
