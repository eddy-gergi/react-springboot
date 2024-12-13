import React from "react";

const DeleteBookForm = () => {
  return (
    <div>
      <h2 className="text-center text-3xl mt-4">Delete Book</h2>
      <p>Enter book ID to delete.</p>
      <input type="text" placeholder="Book ID" className="input mt-4" />
      <button className="btn btn-error mt-4">Delete</button>
    </div>
  );
};

export default DeleteBookForm;
