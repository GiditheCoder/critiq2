// import React, { useState } from 'react';
// import Select from 'react-select';
// import critiqLogo from '../images/critiq-logo.png';
// import { useNavigate } from 'react-router-dom';

// const COUNTRIES = [
//   'Nigeria','United States','United Kingdom','Ghana','South Africa','Kenya',
//   'Jamaica','Canada','Australia','France','Germany','Spain','Italy','Brazil',
//   'Mexico','India','Pakistan','China','Japan','Netherlands','Sweden','Norway',
//   'Denmark'
// ];

// const customStyles = {
//   control: (base) => ({
//     ...base,
//     backgroundColor: 'transparent',
//     borderColor: '#4B5563',
//     borderRadius: '0.5rem',
//     padding: '4px',
//     boxShadow: 'none',
//     color: 'white',
//     '&:hover': { borderColor: '#a855f7' }
//   }),
//   singleValue: (base) => ({
//     ...base,
//     color: 'white',
//   }),
//   menu: (base) => ({
//     ...base,
//     backgroundColor: '#1a1a2e',
//     color: 'white',
//   }),
//   option: (base, state) => ({
//     ...base,
//     backgroundColor: state.isFocused ? '#a855f7' : '#1a1a2e',
//     color: 'white',
//     cursor: 'pointer',
//   }),
//   placeholder: (base) => ({
//     ...base,
//     color: '#9CA3AF',
//   }),
//   menuPortal: (base) => ({
//     ...base,
//     zIndex: 9999,
//   }),
// };

// const UserDetails = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     fullName: '',
//     age: '',
//     nationality: '',
//   });
//   const [successMessage, setSuccessMessage] = useState('');

//   const handleSelectChange = (field, option) => {
//     setFormData((prev) => ({ ...prev, [field]: option ? option.value : '' }));
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };


//   const handleSubmit = async (e) => {
//   e.preventDefault();

//   try {
//     const res = await fetch("http://localhost:5001/api/user_details", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(formData),
//     });

//     if (!res.ok) throw new Error("Failed to save");

//     setSuccessMessage("Thanks for submitting your detail!");
//     setTimeout(() => navigate("/select-vibe"), 2000);
//   } catch (err) {
//     console.error(err);
//     alert("Something went wrong");
//   }
// };

//   return (
//     <div className="min-h-screen bg-[#0f0f1a] text-white flex flex-col items-center p-6">
//       {/* Header */}
//       <div className="w-full flex items-center justify-between mb-8">
//         <img src={critiqLogo} alt="Critiq Logo" className="h-30 w-30" />
//         <h2 className="text-lg font-semibold">User Sign Up</h2>
//       </div>

//       {/* Form Container */}
//       <div className="bg-[#1a1a2e] w-full max-w-2xl p-8 rounded-2xl shadow-md">
//         <h3 className="text-xl font-bold mb-6">Enter Your Details</h3>

//         <form onSubmit={handleSubmit} className="space-y-5">
//           {/* Full Name */}
//           <div>
//             <label className="block mb-2 text-sm">Full Name</label>
//             <input
//               type="text"
//               name="fullName"
//               placeholder="Your Full Name"
//               value={formData.fullName}
//               onChange={handleChange}
//               className="w-full p-3 rounded-lg bg-transparent border border-gray-600 focus:outline-none focus:border-purple-500"
//               required
//             />
//           </div>

//           {/* Age */}
//           <div>
//             <label className="block mb-2 text-sm">Age</label>
//             <input
//               type="number"
//               name="age"
//               placeholder="Your Age"
//               min="0"
//               value={formData.age}
//               onChange={handleChange}
//               className="w-full p-3 rounded-lg bg-transparent border border-gray-600 focus:outline-none focus:border-purple-500"
//               required
//             />
//           </div>

//           {/* Nationality */}
//           <div>
//             <label className="block mb-2 text-sm">Nationality</label>
//             <Select
//               options={COUNTRIES.map((c) => ({ value: c, label: c }))}
//               styles={customStyles}
//               placeholder="Select Nationality"
//               value={formData.nationality ? { value: formData.nationality, label: formData.nationality } : null}
//               onChange={(option) => handleSelectChange('nationality', option)}
//               isClearable
//               menuPortalTarget={document.body}
//               menuPosition="fixed"
//             />
//           </div>

//           {/* Submit */}
//           <button
//             type="submit"
//             className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 rounded-lg transition"
//           >
//             Next
//           </button>
//         </form>

//         {/* ✅ Success Message */}
//         {successMessage && (
//           <p className="mt-4 text-green-400 font-medium text-center">
//             {successMessage}
//           </p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default UserDetails;


import React, { useState } from 'react';
import Select from 'react-select';
import critiqLogo from '../images/critiq-logo.png';
import { useNavigate } from 'react-router-dom';

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
    '&:hover': { borderColor: '#a855f7' },
  }),
  singleValue: (base) => ({
    ...base,
    color: 'white',
  }),
  menu: (base) => ({
    ...base,
    backgroundColor: '#1a1a2e',
    color: 'white',
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isFocused ? '#a855f7' : '#1a1a2e',
    color: 'white',
    cursor: 'pointer',
  }),
  placeholder: (base) => ({
    ...base,
    color: '#9CA3AF',
  }),
  menuPortal: (base) => ({
    ...base,
    zIndex: 9999,
  }),
};

const UserDetails = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    age: '',
    nationality: '',
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSelectChange = (field, option) => {
    setFormData((prev) => ({ ...prev, [field]: option ? option.value : '' }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true); // dim button immediately

    try {
      const res = await fetch('http://localhost:5001/api/user_details', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error('Failed to save');

      setSuccessMessage('Thanks for submitting your detail!');
      setTimeout(() => navigate('/select-vibe'), 2000);
    } catch (err) {
      console.error(err);
      alert('Something went wrong');
      setIsSubmitting(false); // restore opacity if error
    }
  };

  return (
    <div className="min-h-screen bg-[#0f0f1a] text-white flex flex-col items-center p-6">
      {/* Header */}
      <div className="w-full flex items-center justify-between mb-8">
        <img src={critiqLogo} alt="Critiq Logo" className="h-30 w-30" />
        <h2 className="text-lg font-semibold">User Sign Up</h2>
      </div>

      {/* Form Container */}
      <div className="bg-[#1a1a2e] w-full max-w-2xl p-8 rounded-2xl shadow-md">
        <h3 className="text-xl font-bold mb-6">Enter Your Details</h3>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Full Name */}
          <div>
            <label className="block mb-2 text-sm">Full Name</label>
            <input
              type="text"
              name="fullName"
              placeholder="Your Full Name"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-transparent border border-gray-600 focus:outline-none focus:border-purple-500"
              required
            />
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
              required
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
            disabled={isSubmitting}
            className={`w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 rounded-lg transition ${
              isSubmitting ? 'opacity-60 cursor-not-allowed' : ''
            }`}
          >
            {isSubmitting ? 'Submitting...' : 'Next'}
          </button>
        </form>

        {/* ✅ Success Message */}
        {successMessage && (
          <p className="mt-4 text-green-400 font-medium text-center">
            {successMessage}
          </p>
        )}
      </div>
    </div>
  );
};

export default UserDetails;

