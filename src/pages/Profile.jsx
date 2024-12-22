import React from 'react';
import profile from "../assets/profile.png";
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  let navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('accessToken'); // Remove access token from localStorage
    alert("You have been logged out."); // Optional: Alert the user
    navigate('/auth/login', { replace: true });
  };

  return (
    <div className="min-h-screen  bg-white flex flex-col justify-center items-center pt-16 px-4">
      {/* Welcome Text */}
      <div className="text-center mb-16">
        <h1 className="text-4xl  text-gray-800 mb-2">Welcome to</h1>
        <div className="flex items-center justify-center">
          <span className="text-5xl font-black text-indigo-600">Unstop</span>
          
        </div>
      </div>

      {/* Profile Card - Using regular div with card-like styling */}
      <div className="w-full  max-w-xs px-3 py-8 rounded-2xl shadow-xl bg-white border border-gray-200">
        <div className="flex flex-col items-center">
          {/* Profile Image */}
          <div className="w-24 h-24 rounded-full overflow-hidden mb-4">
            <img 
              src={profile}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Profile Info */}
          <h2 className="text-xl font-semibold text-indigo-600 mb-2">
            Michael Dam
          </h2>
          <p className="text-gray-600 mb-1">example@gmail.com</p>
          <p className="text-gray-500 mb-6">Female</p>

          {/* Logout Button */}
          <button 
            onClick={handleLogout} // Call handleLogout on button click
            className="bg-indigo-600 text-white px-12 py-3 text-xs rounded-2xl hover:bg-indigo-700 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;