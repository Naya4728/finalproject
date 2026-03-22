"use client";

import { useState, useEffect } from "react";
import axios from "axios";

export default function ApplicantDashboard() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await axios.get("http://localhost:3000/applications");
        setApplications(res.data);
      } catch (error) {
        console.error("Error fetching applications:", error);
      }
    };
    fetchApplications();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">My Applications</h1>
      {applications.length === 0 ? (
        <p>No applications submitted yet.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {applications.map((app) => (
            <div key={app.id} className="bg-white p-4 rounded shadow">
              <h2 className="font-semibold text-xl mb-2">
                {app.personal.firstName} {app.personal.lastName}
              </h2>
              <p><span className="font-medium">Email:</span> {app.personal.email}</p>
              <p><span className="font-medium">Course:</span> {app.academic.course}</p>
              <p>
                <span className="font-medium">Status:</span>{" "}
                <span
                  className={`ml-2 font-bold ${
                    app.status === "Approved"
                      ? "text-green-600"
                      : app.status === "Rejected"
                      ? "text-red-600"
                      : "text-yellow-600"
                  }`}
                >
                  {app.status || "Pending"}
                </span>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}