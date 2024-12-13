import React, { useState } from "react";
import axios from "axios";

const DeleteAdminForm = () => {
  const [adminId, setAdminId] = useState("");

  const handleDeleteAdmin = async () => {
    try {
      await axios.delete(`http://localhost:8080/api/admins/${adminId}`);
      alert(`Admin with ID ${adminId} has been successfully deleted.`);
      setAdminId("");
    } catch (error) {
      console.error("Failed to delete admin:", error.message);
      alert("Failed to delete the admin. Please check the ID and try again.");
    }
  };

  return (
    <div>
      <h2 className="text-center text-3xl mt-4">Delete Admin</h2>
      <input
        type="text"
        placeholder="Enter Admin ID"
        value={adminId}
        onChange={(e) => setAdminId(e.target.value)}
        className="input mt-4"
      />
      <button
        onClick={handleDeleteAdmin}
        className="btn btn-error mt-4"
      >
        Delete Admin
      </button>
    </div>
  );
};

export default DeleteAdminForm;
