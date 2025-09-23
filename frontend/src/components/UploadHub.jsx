import React, { useState, useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import userIcon from "../images/user12.png";
import critiqLogo from "../images/critiq-logo.png";

const COUNTRIES = [
  "Nigeria", "United States", "United Kingdom", "Ghana", "South Africa",
  "Kenya", "Jamaica", "Canada", "Australia", "France", "Germany"
];

const GENRES = ["Afrobeats", "Hip-Hop", "Pop", "R&B", "Dancehall", "Rock", "Jazz"];

const customStyles = {
  control: (base) => ({
    ...base,
    backgroundColor: "transparent",
    borderColor: "#4B5563",
    borderRadius: "0.5rem",
    padding: "4px",
    boxShadow: "none",
    "&:hover": { borderColor: "#a855f7" },
  }),
  singleValue: (base) => ({ ...base, color: "white" }),
  menu: (base) => ({ ...base, backgroundColor: "#1a1a2e", color: "white" }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isFocused ? "#a855f7" : "#1a1a2e",
    color: "white",
  }),
  placeholder: (base) => ({ ...base, color: "#9CA3AF" }),
  menuPortal: (base) => ({ ...base, zIndex: 9999 }),
};

const UploadHub = () => {
  const navigate = useNavigate();
  const { user, isLoaded } = useUser();

  const [formData, setFormData] = useState({
    title: "",
    name: "",
    genre: "",
    nationality: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 🔹 Prefill artist name from Clerk user.username
  useEffect(() => {
    if (isLoaded && user) {
      const defaultName =
        user.username ||
        user.fullName ||
        user.firstName ||
        user.primaryEmailAddress?.emailAddress ||
        "";
      setFormData((prev) => ({ ...prev, name: defaultName }));
    }
  }, [isLoaded, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (field, option) => {
    setFormData((prev) => ({ ...prev, [field]: option ? option.value : "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      setLoading(true);
      const res = await fetch("https://critiq-backend-oqye.onrender.com/api/song_details", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Upload failed");

      console.log("Inserted row:", data.data);
      navigate("/successful-upload");
    } catch (err) {
      setError(err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0D0C1D] text-white flex flex-col items-center py-10 px-6">
      {/* Top bar */}
      <div className="flex items-center justify-between w-full mb-12">
        <img src={critiqLogo} alt="Critiq Logo" className="w-20" />
        <img src={userIcon} alt="User" className="w-12 h-12 rounded-full border-2 border-gray-700" />
      </div>

      <form onSubmit={handleSubmit} className="w-full max-w-2xl flex flex-col gap-6">
        {/* Song Title */}
        <div>
          <label className="block text-sm text-gray-300 mb-2">Song Title</label>
          <input
            type="text"
            name="title"
            placeholder="Neon Dream"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded bg-transparent border border-gray-600 focus:border-purple-500 outline-none"
            required
          />
        </div>

        {/* Artist Name */}
        <div>
          <label className="block text-sm text-gray-300 mb-2">Artist Name</label>
          <input
            type="text"
            name="name"
            placeholder="Your Artist Name"
               disabled     
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded bg-transparent border border-gray-600 focus:border-purple-500 outline-none"
            required
          />
        </div>

        {/* Genre */}
        <div>
          <label className="block text-sm text-gray-300 mb-2">Genre</label>
          <Select
            options={GENRES.map((g) => ({ value: g, label: g }))}
            styles={customStyles}
            placeholder="Select Genre"
            value={formData.genre ? { value: formData.genre, label: formData.genre } : null}
            onChange={(option) => handleSelectChange("genre", option)}
            isClearable
            menuPortalTarget={document.body}
          />
        </div>

        {/* Nationality */}
        <div>
          <label className="block text-sm text-gray-300 mb-2">Nationality</label>
          <Select
            options={COUNTRIES.map((c) => ({ value: c, label: c }))}
            styles={customStyles}
            placeholder="Select Nationality"
            value={
              formData.nationality
                ? { value: formData.nationality, label: formData.nationality }
                : null
            }
            onChange={(option) => handleSelectChange("nationality", option)}
            isClearable
            menuPortalTarget={document.body}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-full font-medium transition"
        >
          {loading ? "Saving..." : "Submit"}
        </button>

        {error && <p className="text-red-400 mt-2">{error}</p>}
      </form>
    </div>
  );
};

export default UploadHub;
