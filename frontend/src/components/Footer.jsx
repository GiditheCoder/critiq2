import React, { useState, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const Footer = () => {
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [loading, setLoading] = useState(true);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      setLoaded(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="bg-gray-900 text-white py-16 px-6">
      <div className="max-w-md mx-auto text-center">

        {/* Header Text */}
        <div className="mb-8">
          {loading ? (
            <>
              <Skeleton height={24} width={280} baseColor="#A259FF" highlightColor="#E2CCFF" style={{ opacity: 0.2 }} className="mb-2" />
              <Skeleton height={24} width={150} baseColor="#A259FF" highlightColor="#E2CCFF" style={{ opacity: 0.2 }} />
            </>
          ) : (
            <>
              <h2 className={`text-lg font-medium mb-2 transition-opacity duration-700 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
                Subscribe to our news and get
              </h2>
              <p className={`text-lg font-medium transition-opacity duration-700 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
                latest updates
              </p>
            </>
          )}
        </div>

        {/* Form */}
        <form className="space-y-4 mb-12">
          {loading ? (
            <>
              <Skeleton height={48} width="100%" baseColor="#A259FF" highlightColor="#E2CCFF" style={{ opacity: 0.2, borderRadius: 8 }} />
              <Skeleton height={48} width="100%" baseColor="#A259FF" highlightColor="#E2CCFF" style={{ opacity: 0.2, borderRadius: 8 }} />
              <Skeleton height={48} width={140} baseColor="#A259FF" highlightColor="#E2CCFF" style={{ opacity: 0.2, borderRadius: 9999 }} />
            </>
          ) : (
            <>
              <input
                type="text"
                name="name"
                placeholder="Enter Your Name"
                value={formData.name}
                onChange={handleInputChange}
                className={`w-full bg-transparent border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors ${loaded ? 'opacity-100' : 'opacity-0'} duration-700`}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Enter Your Email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full bg-transparent border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors ${loaded ? 'opacity-100' : 'opacity-0'} duration-700`}
                required
              />
              <button
                type="submit"
                className={`bg-[#A259FF] hover:bg-[#E2CCFF] text-white hover:text-[#A259FF] font-semibold py-3 px-8 rounded-full transition-colors duration-300 shadow-lg ${loaded ? 'opacity-100' : 'opacity-0'} `}
              >
                Submit
              </button>
            </>
          )}
        </form>

        {/* Copyright */}
        {loading ? (
          <Skeleton height={16} width={250} baseColor="#A259FF" highlightColor="#E2CCFF" style={{ opacity: 0.2 }} />
        ) : (
          <div className={`text-gray-400 text-sm transition-opacity duration-700 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
            Copyright © 2025 <span className="text-purple-400 font-medium">Critiq</span>. All Rights Reserved.
          </div>
        )}
      </div>
    </div>
  );
};

export default Footer;
