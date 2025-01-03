import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 mt-auto py-2">
      <div className="text-center text-gray-500 text-xs">
        <p>
          &copy; {new Date().getFullYear()} LibraFlick. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
