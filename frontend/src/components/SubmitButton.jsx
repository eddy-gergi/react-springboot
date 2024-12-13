import React from "react";

const SubmitButton = ({ isLoading, children }) => {
  return (
    <button
      type="submit"
      className={`btn w-full mt-4 ${
        isLoading ? "btn-loading" : "btn-primary"
      }`}
      disabled={isLoading}
    >
      {isLoading ? (
        <span>Loading...</span>
      ) : (
        children
      )}
    </button>
  );
};

export default SubmitButton;
