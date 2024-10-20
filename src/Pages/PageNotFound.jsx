import React from 'react'
import { Link } from 'react-router-dom'

const PageNotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white p-4">
      <img
        src="https://cdn.dribbble.com/users/2243442/screenshots/11362056/media/c9432283d2d6ba1a23f2fcd6169f2983.gif"
        alt="404 Not Found"
        className="mx-auto object-cover w-full max-w-2xl "
      />
      <h1 className="text-5xl font-bold text-dark mb-4 text-center">Oops! Page Not Found</h1>
      <p className="text-xl text-gray-700 mb-8 text-center">
        It seems you've wandered off the beaten path.
      </p>
      <button asChild className="bg-teal-500 px-5 py-2 text-white rounded-md hover:bg-teal-600">
        <Link to="/">Return to Home</Link>
      </button>
    </div>
  )
}

export default PageNotFound