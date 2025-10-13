import React, { useState, useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import { UploadButton } from "@uploadthing/react";
import "@uploadthing/react/styles.css";

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
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
  setLoading(true);

  if (!user) {
    alert("User not loaded yet!");
    return;
  }

  
  console.log("🧑‍💻 Submitting:", {
    title: formData.title,
    name: user.fullName || formData.name,
    genre: formData.genre,
    nationality: formData.nationality,
    imageUrl: uploadedImageUrl,
    userId: user.id, // ✅ make sure this exists
  });


  try {
    if (!uploadedImageUrl) throw new Error("Please upload an image first");
    if (!user || !user.id) throw new Error("User not authenticated");

    const res = await fetch("https://critiq-backend-6v3f.onrender.com/api/song_details", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: formData.title,
        name: user?.fullName || formData.name,
        genre: formData.genre,
        nationality: formData.nationality,
        imageUrl: uploadedImageUrl,
        userId: user.id, 
      }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Upload failed");

    console.log("✅ Song saved:", data.data);
    navigate("/successful-upload", {
      state: { songTitle: formData.title, imageUrl: uploadedImageUrl },
    });
  } catch (err) {
    console.error(err);
    setError(err.message);
  } finally {
    setLoading(false);
  }
};

if (!isLoaded || !user) {
  return (
    <div className="min-h-screen bg-[#0D0C1D] text-white flex items-center justify-center">
      <p>Loading...</p>
    </div>
  );
}


  return (
    <div className="min-h-screen bg-[#0D0C1D] text-white flex flex-col items-center py-10 px-6">
      <div className="flex items-center justify-center w-full mb-12">
        <h1 className="text-white text-center">Upload</h1>
      </div>

      <form onSubmit={handleSubmit} className="w-full max-w-2xl flex flex-col gap-6">
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

        <div>
          <label className="block text-sm text-gray-300 mb-2">Genre</label>
          <Select
            options={GENRES.map((g) => ({ value: g, label: g }))}
            styles={customStyles}
            placeholder="Select Genre"
            value={formData.genre ? { value: formData.genre, label: formData.genre } : null}
            onChange={(option) => handleSelectChange("genre", option)}
            isClearable
          />
        </div>

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
          />
        </div>

        {/* UploadThing button */}
        <div>
          <label className="block text-sm text-gray-300 mb-2">Upload Image</label>

          <UploadButton
            endpoint="imageUploader"
            url='https://critiq-backend-6v3f.onrender.com/api/uploadthing'
            onClientUploadComplete={(res) => {
              console.log("✅ Upload complete:", res);
              setUploadedImageUrl(res[0].url);
            }}
            onUploadError={(error) => {
              console.error("❌ Upload error:", error);
              setError("Image upload failed. Please try again.");
            }}
          />

      {uploadedImageUrl && (
            <div className="mt-4 w-32 h-32">
              <img
                src={uploadedImageUrl}
                alt="Uploaded"
                className="w-full h-full object-cover rounded-lg border border-gray-700"
              />
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



