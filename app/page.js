'use client';

import { useRouter } from 'next/navigation';
import { FaUserPlus, FaSignInAlt, FaPlaneDeparture } from 'react-icons/fa';

const LandingPage = () => {
  const router = useRouter();

  const handleSignUp = () => {
    router.push('/signup');
  };

  const handleLogIn = () => {
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 via-indigo-300 to-purple-400 flex flex-col">
      
      <header className="flex justify-between items-center p-6 bg-white shadow-lg">
        <div className="flex items-center gap-3">
          <FaPlaneDeparture className="text-4xl text-indigo-600" />
          <h1 className="text-2xl font-bold text-gray-800">Palawan Tour</h1>
        </div>
      </header>

      
      <div className="relative flex-1 flex flex-col justify-center items-center text-center py-20 px-6 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://generosepomelo.com/wp-content/uploads/2018/03/img_2464.jpg?w=1568')",
        }}
      >
        
        <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-10"></div>

        
        <div className="relative z-20 w-full h-full flex flex-col justify-center items-center text-center py-20 px-6">
          <h1 className="text-5xl font-extrabold text-white mb-6 leading-snug">
            Explore the Wonders of Palawan
          </h1>
          <p className="text-lg text-white mb-10 max-w-xl">
            Discover the pristine beaches, crystal-clear waters, and breathtaking landscapes of Palawan. Your next great adventure starts here.
          </p>
          <div className="flex gap-6">
            <button
              className="px-6 py-3 text-white bg-indigo-600 rounded-full hover:bg-indigo-700 transition duration-300 transform hover:scale-105 flex items-center gap-2"
              onClick={handleSignUp}
            >
              <FaUserPlus /> Sign Up
            </button>
            <button
              className="px-6 py-3 text-white bg-indigo-600 rounded-full hover:bg-indigo-700 transition duration-300 transform hover:scale-105 flex items-center gap-2"
              onClick={handleLogIn}
            >
              <FaSignInAlt /> Log In
            </button>
          </div>
        </div>
      </div>

      
      <div className="bg-white py-16 px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          
          <div className="p-6 bg-indigo-50 rounded-lg shadow-md hover:shadow-lg transition duration-300 hover:scale-105 text-center">
            <h3 className="text-2xl font-semibold text-indigo-700 mb-4">Top Destinations</h3>
            <p className="text-gray-700">
              Explore popular spots like El Nido, Coron, and Puerto Princesa.
            </p>
          </div>
          
          <div className="p-6 bg-indigo-50 rounded-lg shadow-md hover:shadow-lg transition duration-300 hover:scale-105 text-center">
            <h3 className="text-2xl font-semibold text-indigo-700 mb-4">Affordable Packages</h3>
            <p className="text-gray-700">
              Enjoy flexible travel plans that fit your budget.
            </p>
          </div>
          
          <div className="p-6 bg-indigo-50 rounded-lg shadow-md hover:shadow-lg transition duration-300 hover:scale-105 text-center">
            <h3 className="text-2xl font-semibold text-indigo-700 mb-4">Expert Guides</h3>
            <p className="text-gray-700">
              Local experts to ensure your journey is safe and memorable.
            </p>
          </div>
        </div>
      </div>

      
      <footer className="bg-gray-800 text-white text-center py-4">
        <p>© 2024 Palawan Tour | All Rights Reserved</p>
      </footer>
    </div>
  );
};

export default LandingPage;
