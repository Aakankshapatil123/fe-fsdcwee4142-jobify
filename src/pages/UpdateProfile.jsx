import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import instance from "../instances/instance";

const UpdateProfile = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    skils: "",
    bio: "",
    experience: 0,
  });

  const [loading, setLoading] = useState(false);

  // Get logged-in user details
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (storedUser) {
      setUser({
        name: storedUser.name || "",
        email: storedUser.email || "",
        phone: storedUser.phone || "",
        location: storedUser.location || "",
        skils: Array.isArray(storedUser.skils)
          ? storedUser.skils.join(", ")
          : storedUser.skils || "",
        bio: storedUser.bio || "",
        experience: storedUser.experience || 0,
      });
    }
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Update profile
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const profileData = {
        name: user.name,
        phone: user.phone,
        location: user.location,
        bio: user.bio,
        experience: Number(user.experience),
        skils: user.skils
          .split(",")
          .map((skill) => skill.trim())
          .filter((skill) => skill !== ""),
      };

      const response = await instance.put(
        "/auth/update-profile",
        profileData
      );

      // Update localStorage with latest user data
      const oldUser = JSON.parse(localStorage.getItem("user")) || {};

      const updatedUser = {
        ...oldUser,
        ...response.data.user,
      };

      localStorage.setItem("user", JSON.stringify(updatedUser));

      toast.success("Profile updated successfully!");

      // Go back to dashboard
      navigate("/dashboard");

    } catch (error) {
      console.error("Update profile error:", error);

      toast.error(
        error.response?.data?.message ||
          "Failed to update profile"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-10">
      <div className="bg-white w-full max-w-2xl rounded-lg shadow-lg p-8">

        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Update Profile
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Name
            </label>

            <input
              type="text"
              name="name"
              value={user.name}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your name"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={user.email}
              disabled
              className="w-full border rounded-lg px-4 py-3 bg-gray-100 text-gray-500"
            />

            <p className="text-xs text-gray-500 mt-1">
              Email cannot be changed.
            </p>
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone
            </label>

            <input
              type="text"
              name="phone"
              value={user.phone}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter phone number"
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Location
            </label>

            <input
              type="text"
              name="location"
              value={user.location}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your location"
            />
          </div>

          {/* Skills */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Skills
            </label>

            <input
              type="text"
              name="skils"
              value={user.skils}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="React, JavaScript, Node.js"
            />

            <p className="text-xs text-gray-500 mt-1">
              Separate multiple skills with commas.
            </p>
          </div>

          {/* Experience */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Experience (Years)
            </label>

            <input
              type="number"
              name="experience"
              value={user.experience}
              onChange={handleChange}
              min="0"
              className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="0"
            />
          </div>

          {/* Bio */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Bio
            </label>

            <textarea
              name="bio"
              value={user.bio}
              onChange={handleChange}
              rows="4"
              className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Tell something about yourself"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-2">

            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? "Updating..." : "Update Profile"}
            </button>

            <button
              type="button"
              onClick={() => navigate("/dashboard")}
              className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300"
            >
              Cancel
            </button>

          </div>

        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;