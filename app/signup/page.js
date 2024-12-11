'use client';

import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { useRouter } from 'next/navigation';
import { FaEnvelope, FaLock, FaUser, FaSpinner, FaHome } from 'react-icons/fa'; // Import icons

const SignupPage = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);  // To track the loading state
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Show loading spinner
    try {
      await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      router.push('/login'); // Redirect to the login page after successful signup
    } catch (error) {
      console.error(error.message);
      alert('Error creating account: ' + error.message); // Show error message
    } finally {
      setLoading(false); // Hide loading spinner after processing
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 via-indigo-300 to-purple-400 flex justify-center items-center px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">Sign Up</h1>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="flex items-center border border-gray-300 rounded-md px-3 py-2">
            <FaEnvelope className="text-indigo-500 mr-2" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Address"
              className="w-full outline-none text-gray-700"
              required
            />
          </div>
          <div className="flex items-center border border-gray-300 rounded-md px-3 py-2">
            <FaLock className="text-indigo-500 mr-2" />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full outline-none text-gray-700"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-full hover:bg-indigo-700 transition transform hover:scale-105 flex justify-center items-center gap-2"
          >
            {loading ? (
              <FaSpinner className="animate-spin" size={20} />
            ) : (
              <>
                <FaUser /> Sign Up
              </>
            )}
          </button>
        </form>
        <div className="flex justify-between items-center mt-6">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <a href="/login" className="text-indigo-600 hover:underline">
              Login here
            </a>
          </p>
          <a
            href="/"
            className="flex items-center text-indigo-600 hover:underline gap-2"
          >
            <FaHome /> Home
          </a>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
