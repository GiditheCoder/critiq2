import React, { useState } from 'react';
import Select from 'react-select';
import critiqLogo from '../images/critiq-logo.png';
import { useNavigate } from 'react-router-dom';

const GENRES = [
  'Afrobeats', 'Dancehall', 'Rap', 'Pop', 'Drill', 'R&B', 'Hip-Hop', 'Indie',
  'Pop Rock', 'Folk', 'Electronic', 'Jazz', 'Country', 'Classical', 'Reggae',
  'Punk', 'Blues', 'Metal', 'Rock', 'Soul', 'Other'
];

const COUNTRIES = [
  'Nigeria', 'United States', 'United Kingdom', 'Ghana', 'South Africa', 'Kenya',
  'Jamaica', 'Canada', 'Australia', 'France', 'Germany', 'Spain', 'Italy', 'Brazil',
  'Mexico', 'India', 'Pakistan', 'China', 'Japan', 'Netherlands', 'Sweden', 'Norway',
  'Denmark'
];

const customStyles = {
  control: (base) => ({
    ...base,
    backgroundColor: 'transparent',
    borderColor: '#4B5563',
    borderRadius: '0.5rem',
    padding: '4px',
    boxShadow: 'none',
    color: 'white',
    '&:hover': { borderColor: '#a855f7' }
  }),
  singleValue: (base) => ({ ...base, color: 'white' }),
  menu: (base) => ({ ...base, backgroundColor: '#1a1a2e', color: 'white' }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isFocused ? '#a855f7' : '#1a1a2e',
    color: 'white',
    cursor: 'pointer',
  }),
  placeholder: (base) => ({ ...base, color: '#9CA3AF' }),
  menuPortal: (base) => ({ ...base, zIndex: 9999 }),
};

const ArtisteDetails = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    genre: '',
    band: '',
    bio: '',
    age: '',
    nationality: ''
  });

  const [bioError, setBioError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSelectChange = (field, option) => {
    setFormData((prev) => ({ ...prev, [field]: option ? option.value : '' }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Special handling for bio to check word count
    if (name === 'bio') {
      const words = value.trim().split(/\s+/).filter(Boolean);
      if (words.length > 50) {
        setBioError('Bio cannot exceed 50 words');
      } else {
        setBioError('');
      }
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (bioError) return; // stop submission if bio too long

    try {
      const res = await fetch('https://critiq-backend-6v3f.onrender.com/api/artiste_details', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const error = await res.json().catch(() => ({}));
        throw new Error(error.message || 'Failed to save');
      }

      setSuccessMessage('Thanks for submitting your details!');
      setTimeout(() => navigate('/select-vibe'), 2000);
    } catch (err) {
      console.error('Error saving details:', err);
      alert(err.message || 'Something went wrong');
    }
  };

  return (
    <div className="min-h-screen bg-[#0f0f1a] text-white flex flex-col items-center p-6">
      {/* Header */}
      <div className="w-full flex items-center justify-between mb-8">
        <img src={critiqLogo} alt="Critiq Logo" className="h-30 w-30" />
        <h2 className="text-lg font-semibold">Artiste Sign Up</h2>
      </div>

      {/* Form Container */}
      <div className="bg-[#1a1a2e] w-full max-w-2xl p-8 rounded-2xl shadow-md">
        <h3 className="text-xl font-bold mb-6">Enter Your Details</h3>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Full Name */}
          <div>
            <label className="block mb-2 text-sm">Full Name / Artist Name</label>
            <input
              type="text"
              name="fullName"
              placeholder="Your Artist Name"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-transparent border border-gray-600 focus:outline-none focus:border-purple-500"
              required
            />
          </div>

          {/* Genre */}
          <div>
            <label className="block mb-2 text-sm">Genre</label>
            <Select
              options={GENRES.map((g) => ({ value: g, label: g }))}
              styles={customStyles}
              placeholder="Select Genre"
              value={formData.genre ? { value: formData.genre, label: formData.genre } : null}
              onChange={(option) => handleSelectChange('genre', option)}
              isClearable
              menuPortalTarget={document.body}
              menuPosition="fixed"
            />
          </div>

          {/* Band */}
          <div>
            <label className="block mb-2 text-sm">Band (if any)</label>
            <input
              type="text"
              name="band"
              placeholder="Band name or leave blank"
              value={formData.band}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-transparent border border-gray-600 focus:outline-none focus:border-purple-500"
            />
          </div>

          {/* Bio */}
          <div>
            <label className="block mb-2 text-sm">Bio (max 50 words)</label>
            <textarea
              name="bio"
              placeholder="Tell us about yourself"
              value={formData.bio}
              onChange={handleChange}
              rows="4"
              className="w-full p-3 rounded-lg bg-transparent border border-gray-600 focus:outline-none focus:border-purple-500"
            />
            {bioError && (
              <p className="text-red-500 text-sm mt-1">{bioError}</p>
            )}
          </div>

          {/* Age */}
          <div>
            <label className="block mb-2 text-sm">Age</label>
            <input
              type="number"
              name="age"
              placeholder="Your Age"
              min="0"
              value={formData.age}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-transparent border border-gray-600 focus:outline-none focus:border-purple-500"
            />
          </div>

          {/* Nationality */}
          <div>
            <label className="block mb-2 text-sm">Nationality</label>
            <Select
              options={COUNTRIES.map((c) => ({ value: c, label: c }))}
              styles={customStyles}
              placeholder="Select Nationality"
              value={
                formData.nationality
                  ? { value: formData.nationality, label: formData.nationality }
                  : null
              }
              onChange={(option) => handleSelectChange('nationality', option)}
              isClearable
              menuPortalTarget={document.body}
              menuPosition="fixed"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={!!bioError}
            className={`w-full text-white font-medium py-3 rounded-lg transition ${
              bioError
                ? 'bg-gray-500 cursor-not-allowed'
                : 'bg-purple-600 hover:bg-purple-700'
            }`}
          >
            Next
          </button>
        </form>

        {successMessage && (
          <p className="mt-4 text-green-400 font-medium text-center">
            {successMessage}
          </p>
        )}
      </div>
    </div>
  );
};

export default ArtisteDetails;
