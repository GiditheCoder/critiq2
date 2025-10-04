import React, { useState, useEffect, useRef } from "react";
import { useUser } from "@clerk/clerk-react";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import barLogo from '../images/bar-graph.png';

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
  const fileInputRef = useRef(null); // 🔹 ref to reset input

  const [formData, setFormData] = useState({
    title: "",
    name: "",
    genre: "",
    nationality: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Prefill artist name from Clerk user.username
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

  // handle file input change
  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    if (file) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      setImageFile(null);
      setPreviewUrl(null);
    }
  };

  // cancel image
  const handleRemoveImage = () => {
    setImageFile(null);

    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // cleanup on unmount
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setError(null);

  //   try {
  //     setLoading(true);

  //     const form = new FormData();
  //     form.append("title", formData.title);
  //     form.append("name", formData.name);
  //     form.append("genre", formData.genre);
  //     form.append("nationality", formData.nationality);
  //     form.append("image", imageFile);
  

  //     const res = await fetch("https://critiq-backend-6v3f.onrender.com/api/song_details", {
  //       method: "POST",
  //       body: form,
  //     });

  //     const data = await res.json();
  //     if (!res.ok) throw new Error(data.message || "Upload failed");

  //     console.log("Inserted row:", data.data);
  //     navigate("/successful-upload");
  //   } catch (err) {
  //     setError(err.message);
  //     console.error(err);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

const handleSubmit = async (e) => {
  e.preventDefault();
  setError(null);

  try {
    setLoading(true);

    const form = new FormData();
    form.append("title", formData.title);
    form.append("name", formData.name);
    form.append("genre", formData.genre);
    form.append("nationality", formData.nationality);

    if (imageFile) {
      form.append("image", imageFile); // 👈 key name MUST match multer.single("image")
    }

    console.log("📤 Sending form data:", {
      title: formData.title,
      name: formData.name,
      genre: formData.genre,
      nationality: formData.nationality,
      image: imageFile ? imageFile.name : "no image",
    });

    const res = await fetch(
      "https://critiq-backend-6v3f.onrender.com/api/song_details",
      {
        method: "POST",
        body: form, // 👈 do NOT add headers, browser auto-handles boundaries
      }
    );

    const data = await res.json();
    console.log("📥 Backend response:", data);

    if (!res.ok) {
      throw new Error(data.message || "Upload failed");
    }

    console.log("✅ Upload successful");
    navigate("/successful-upload");
  } catch (err) {
    console.error("❌ Frontend error:", err);
    setError(err.message);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-[#0D0C1D] text-white flex flex-col items-center py-10 px-6">
      {/* Top bar */}
      <div className="flex items-center justify-center w-full mb-12">
  <h1 className="text-white text-center">Upload</h1>
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

        {/* Image Upload */}
        <div>
          <label className="block text-sm text-gray-300 mb-2">Upload Image</label>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full px-4 py-3 rounded bg-transparent border border-gray-600 focus:border-purple-500 outline-none"
          />

          {/* Preview */}
          {previewUrl && (
            <div className="relative mt-4 w-32 h-32">
              <img
                src={previewUrl}
                alt="Preview"
                className="w-full h-full object-cover rounded-lg border border-gray-700"
              />
              <button
                type="button"
                onClick={handleRemoveImage}
                className="absolute top-1 right-1 bg-red-500 text-white w-6 h-6 flex items-center justify-center rounded-full text-sm"
              >
                ✕
              </button>
            </div>
          )}
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
