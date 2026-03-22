"use client";

import { useState, useEffect } from "react";
import axios from "axios";

export default function AdminDashboard() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [confirmation, setConfirmation] = useState("");

  // Fetch applications
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await axios.get("/api/applications"); // your API endpoint
        const apps = res.data.map((app) => ({
          ...app,
          status: app.status || "Pending",
        }));
        setApplications(apps);
      } catch (err) {
        setError("Failed to fetch applications");
        console.error(err);
      }
    };
    fetchApplications();
  }, []);

  // Update status
  const handleStatusChange = async (id, status) => {
    setLoading(true);
    setError("");
    try {
      await axios.patch("/api/applications", { id, status });

      setApplications((prev) =>
        prev.map((app) => (app.id === id ? { ...app, status } : app))
      );

      setConfirmation(`Application ${id} has been ${status}`);
      setTimeout(() => setConfirmation(""), 3000);
    } catch (err) {
      setError("Failed to update status");
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 p-6 text-white">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {confirmation && (
        <div className="mb-4 p-3 bg-green-600 rounded shadow">{confirmation}</div>
      )}
      {error && <div className="mb-4 p-3 bg-red-600 rounded shadow">{error}</div>}

      {applications.length === 0 ? (
        <p>No applications available.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {applications.map((app) => (
            <div
              key={app.id}
              className="bg-gray-800 p-4 rounded shadow flex flex-col justify-between"
            >
              <div>
                <h2 className="font-semibold text-xl mb-2">
                  {app.personal?.firstName} {app.personal?.lastName}
                </h2>
                <p>
                  <span className="font-medium">Email:</span> {app.personal?.email}
                </p>
                <p>
                  <span className="font-medium">Course:</span> {app.academic?.course}
                </p>
                <p>
                  <span className="font-medium">Status:</span>{" "}
                  <span
                    className={`ml-2 font-bold ${
                      app.status === "Approved"
                        ? "text-green-400"
                        : app.status === "Rejected"
                        ? "text-red-400"
                        : "text-yellow-400"
                    }`}
                  >
                    {app.status}
                  </span>
                </p>
              </div>

              <div className="mt-4 flex justify-between">
                <button
                  disabled={loading || app.status === "Approved"}
                  onClick={() => handleStatusChange(app.id, "Approved")}
                  className={`px-4 py-2 rounded font-semibold ${
                    app.status === "Approved"
                      ? "bg-green-400 text-gray-900 cursor-not-allowed"
                      : "bg-green-600 hover:bg-green-700"
                  }`}
                >
                  Approve
                </button>
                <button
                  disabled={loading || app.status === "Rejected"}
                  onClick={() => handleStatusChange(app.id, "Rejected")}
                  className={`px-4 py-2 rounded font-semibold ${
                    app.status === "Rejected"
                      ? "bg-red-400 text-gray-900 cursor-not-allowed"
                      : "bg-red-600 hover:bg-red-700"
                  }`}
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}