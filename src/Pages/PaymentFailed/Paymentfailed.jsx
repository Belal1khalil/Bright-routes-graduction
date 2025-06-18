import React from 'react'
import { Link } from 'react-router-dom'

export default function PaymentFailed() {
  return (
    <div className="max-w-xl mx-auto p-6 text-center">
      <div className="bg-red-100 border border-red-300 rounded-2xl p-6 shadow-md">
        <h1 className="text-3xl font-bold text-red-700">Payment Failed ❌</h1>
        <p className="text-gray-700 mt-2">Unfortunately, your transaction could not be completed.</p>
        <p className="text-gray-600 mt-1">Please check your payment details or try again later.</p>

        <div className="mt-6 flex justify-center gap-4">
          <Link
            to="/courses"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl shadow transition"
          >
            Browse Courses
          </Link>
          <Link
            to="/"
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-xl shadow transition"
          >
            Return Home
          </Link>
        </div>
      </div>
    </div>
  )
}
