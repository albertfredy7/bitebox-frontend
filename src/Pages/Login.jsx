import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { loginUser, registerUser } from '../services/auth/auth'; // Import the API functions

const Login = ({ isLogin }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data) => {

    setIsLoading(true);
    try {
      if (isLogin) {
        // Call loginUser API for login
        const response = await loginUser({ email: data.email, password: data.password });
        console.log('Login successful:', response);
        // Handle successful login (e.g., redirect or store token)
      } else {
        // Call registerUser API for registration
        const response = await registerUser({
          name: data.name,
          email: data.email,
          password: data.password,
          role: data.role,
        });
        console.log('Registration successful:', response);
        // Handle successful registration (e.g., redirect or store token)
      }
    } catch (error) {
      console.error('Error:', error.message);
      // Handle errors (e.g., show error message to user)
    }
    finally {
      setIsLoading(false); // Set loading state to false when submission completes
    }
  };

  // Watch password field to compare with confirm password
  const password = watch('password', '');

  return (
    <div className="flex min-h-screen bg-white justify-center items-center">
      <div className="bg-white  rounded-lg p-8 w-full max-w-md">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h1 className="text-4xl font-bold p-5 text-center text-teal-500">
            Bite<span className="text-gray-900">BOX</span>
          </h1>
          <h2 className="text-center text-2xl font-semibold text-gray-800">
            {isLogin ? 'Sign in to your account' : 'Create a new account'}
          </h2>
        </div>

        <div className="mt-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Name Field (Only for Register) */}
            {!isLogin && (
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <div className="mt-1">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    {...register('name', { required: 'Name is required' })}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                </div>
              </div>
            )}

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  {...register('email', { required: 'Email is required' })}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  {...register('password', { required: 'Password is required' })}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                />
                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
              </div>
            </div>

            {/* Confirm Password Field (Only for Register) */}
            {!isLogin && (
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <div className="mt-1">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    {...register('confirmPassword', {
                      required: 'Confirm Password is required',
                      validate: (value) => value === password || 'Passwords do not match',
                    })}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                  />
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>
                  )}
                </div>
              </div>
            )}

            {/* Role Selection (Only for Register) */}
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700">Select Role</label>
                <div className="mt-2 flex space-x-4">
                  <div className="flex items-center">
                    <input
                      id="student"
                      type="radio"
                      value="student"
                      {...register('role', { required: 'Role is required' })}
                      className="h-4 w-4 text-teal-600 focus:ring-teal-600 border-gray-300"
                    />
                    <label htmlFor="student" className="ml-2 block text-sm font-medium text-gray-900">
                      Student
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="canteen"
                      type="radio"
                      value="canteen"
                      {...register('role', { required: 'Role is required' })}
                      className="h-4 w-4 text-teal-600 focus:ring-teal-600 border-gray-300"
                    />
                    <label htmlFor="canteen" className="ml-2 block text-sm font-medium text-gray-900">
                      Canteen
                    </label>
                  </div>
                </div>
                {errors.role && <p className="text-red-500 text-xs mt-1">{errors.role.message}</p>}
              </div>
            )}

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={isLoading} // Disable the button while loading
                className={`flex w-full justify-center rounded-md bg-teal-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-teal-500 focus:outline-none transition-all ${isLoading ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <svg
                      className="animate-spin mr-3 w-5 h-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    {isLogin ? "Login":"Registering"}
                  </div>
                ) : (
                  <span>{isLogin ? 'Sign in' : 'Register'}</span>
                )}
              </button>
            </div>
          </form>

          {/* Link to switch between login/register */}
          <p className="mt-10 text-center text-sm text-gray-500">
            {isLogin ? (
              <>
                Not a member?{' '}
                <a href="/register" className="font-semibold text-teal-600 hover:text-teal-500">
                  Create an account
                </a>
              </>
            ) : (
              <>
                Already have an account?{' '}
                <a href="/login" className="font-semibold text-teal-600 hover:text-teal-500">
                  Sign in to your account
                </a>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
