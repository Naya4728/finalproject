"use client";

import { useState } from "react";
import axios from "axios";

export default function MultiStepForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    personal: { firstName: "", lastName: "", email: "" },
    academic: { course: "" },
    guardian: { name: "" }
  });

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  const handleSubmit = async () => {
    try {
      await axios.post("/api/applications", formData);
      alert("Application submitted!");
      setStep(1);
      setFormData({
        personal: { firstName: "", lastName: "", email: "" },
        academic: { course: "" },
        guardian: { name: "" }
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 p-6 text-white">
      <h1 className="text-3xl font-bold mb-6">Application Form</h1>

      {step === 1 && (
        <div className="bg-gray-800 p-6 rounded shadow w-full max-w-md">
          <h2 className="font-semibold mb-2">Personal Info</h2>
          <input
            type="text"
            placeholder="First Name"
            value={formData.personal.firstName}
            onChange={e =>
              setFormData({
                ...formData,
                personal: { ...formData.personal, firstName: e.target.value }
              })
            }
            className="w-full mb-2 p-2 border border-gray-600 rounded bg-gray-700 text-white"
          />
          <input
            type="text"
            placeholder="Last Name"
            value={formData.personal.lastName}
            onChange={e =>
              setFormData({
                ...formData,
                personal: { ...formData.personal, lastName: e.target.value }
              })
            }
            className="w-full mb-2 p-2 border border-gray-600 rounded bg-gray-700 text-white"
          />
          <input
            type="email"
            placeholder="Email"
            value={formData.personal.email}
            onChange={e =>
              setFormData({
                ...formData,
                personal: { ...formData.personal, email: e.target.value }
              })
            }
            className="w-full mb-2 p-2 border border-gray-600 rounded bg-gray-700 text-white"
          />
          <button
            onClick={handleNext}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Next
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="bg-gray-800 p-6 rounded shadow w-full max-w-md">
          <h2 className="font-semibold mb-2">Academic Info</h2>
          <input
            type="text"
            placeholder="Course"
            value={formData.academic.course}
            onChange={e =>
              setFormData({
                ...formData,
                academic: { course: e.target.value }
              })
            }
            className="w-full mb-2 p-2 border border-gray-600 rounded bg-gray-700 text-white"
          />
          <div className="flex justify-between">
            <button
              onClick={handleBack}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Back
            </button>
            <button
              onClick={handleNext}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="bg-gray-800 p-6 rounded shadow w-full max-w-md">
          <h2 className="font-semibold mb-2">Guardian Info</h2>
          <input
            type="text"
            placeholder="Guardian Name"
            value={formData.guardian.name}
            onChange={e =>
              setFormData({
                ...formData,
                guardian: { name: e.target.value }
              })
            }
            className="w-full mb-2 p-2 border border-gray-600 rounded bg-gray-700 text-white"
          />
          <div className="flex justify-between">
            <button
              onClick={handleBack}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Back
            </button>
            <button
              onClick={handleSubmit}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
}