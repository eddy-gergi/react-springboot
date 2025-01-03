import React, { useState, useEffect } from "react";
import axios from "axios";
import { admin_actions_api } from "../../services/api";

const AdminActions = () => {
  const [adminActions, setAdminActions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAdminActionsWithNames = async () => {
      try {
        const response = await axios.get(
          admin_actions_api + "?orderByColumn=actionTimestamp&orderByDirection=descending"
        );
        const actions = response.data;

        const actionsWithNames = await Promise.all(
          actions.map(async (action) => {
            const userResponse = await axios.get(
              `http://localhost:8080/api/users/${action.adminId}`
            );
            return { ...action, adminName: userResponse.data.name };
          })
        );

        setAdminActions(actionsWithNames);
      } catch (err) {
        setError("Failed to load admin actions.");
      } finally {
        setLoading(false);
      }
    };

    fetchAdminActionsWithNames();
  }, []);

  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 py-10">{error}</div>;
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold text-center mb-6">Admin Actions</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {adminActions.map((action) => (
          <div
            key={action.id}
            className="card bg-base-100 shadow-xl p-4 border border-gray-200"
          >
            <div className="card-body">
              <h2 className="card-title text-lg font-bold">
                {action.adminName}
              </h2>
              <p className="text-gray-600">{action.actionInfo}</p>
              <p className="text-sm text-gray-500 mt-2">
                {new Date(action.actionTimestamp).toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminActions;
