'use client';

import { useState } from 'react';
import { FaEnvelope, FaLock, FaSignInAlt, FaHome, FaSpinner } from 'react-icons/fa'; 
import { useRouter } from 'next/navigation'; 
import { auth } from '../firebaseConfig'; 
import { signInWithEmailAndPassword } from 'firebase/auth';

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false); 
  const router = useRouter(); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); 

    try {
      const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
      console.log('User logged in:', userCredential.user);
      router.push('/content'); 
    } catch (error) {
      console.error('Error logging in:', error.message);
      
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 via-indigo-300 to-purple-400 flex justify-center items-center px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">Log In</h1>
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
            disabled={loading} 
          >
            {loading ? (
              <FaSpinner className="animate-spin" /> 
            ) : (
              <FaSignInAlt />
            )}
            {loading ? 'Logging In...' : 'Log In'}
          </button>
        </form>
        <div className="flex justify-between items-center mt-6">
          <p className="text-sm text-gray-600">
            Don’t have an account?{' '}
            <a href="/signup" className="text-indigo-600 hover:underline">
              Sign up
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

export default LoginPage;
