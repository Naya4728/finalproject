// src/app/page.jsx
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-4xl font-bold mb-8">Welcome to SAFApply</h1>
      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
        <Link
          href="/apply"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 text-center"
        >
          Apply Now
        </Link>
        <Link
          href="/dashboard"
          className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 text-center"
        >
          Dashboard
        </Link>
        <Link
          href="/admin"
          className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 text-center"
        >
          Admin 
        </Link>
      </div>
    </div>
  );
}