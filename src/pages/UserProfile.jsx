import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import instance from "../instances/instance";

const UserProfile = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUserProfile = async () => {
      try {
        const response = await instance.get("/auth/me");

        setUser(response.data.user);

        // Keep localStorage updated
        localStorage.setItem(
          "user",
          JSON.stringify(response.data.user)
        );
      } catch (error) {
        console.error("Error fetching profile:", error);

        toast.error(
          error.response?.data?.message ||
            "Failed to load profile"
        );
      } finally {
        setLoading(false);
      }
    };

    getUserProfile();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600 text-lg">
          Loading profile...
        </p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">
          Unable to load profile.
        </p>
      </div>
    );
  }

  const skills = Array.isArray(user.skils)
    ? user.skils
    : [];

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">

      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8">

        {/* Header */}
        <div className="flex justify-between items-center mb-8">

          <h1 className="text-2xl font-bold text-gray-800">
            My Profile
          </h1>

          <button
            onClick={() => navigate("/profile/update")}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Update Profile
          </button>

        </div>

        {/* Profile Picture */}
        <div className="flex flex-col items-center mb-8">

          {user.profilePeture ? (
            <img
              src={user.profilePeture}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border-4 border-gray-200"
            />
          ) : (
            <div className="w-32 h-32 rounded-full bg-blue-600 text-white flex items-center justify-center text-4xl font-bold">
              {user.name
                ? user.name.charAt(0).toUpperCase()
                : "U"}
            </div>
          )}

          <h2 className="text-xl font-semibold text-gray-800 mt-4">
            {user.name || "User"}
          </h2>

          <p className="text-gray-500">
            {user.role || "User"}
          </p>

        </div>

        {/* Profile Information */}
        <div className="border-t pt-6">

          <h2 className="text-lg font-semibold text-gray-800 mb-5">
            Personal Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            {/* Name */}
            <div>
              <p className="text-sm text-gray-500">
                Name
              </p>
              <p className="font-medium text-gray-800 mt-1">
                {user.name || "Not provided"}
              </p>
            </div>

            {/* Email */}
            <div>
              <p className="text-sm text-gray-500">
                Email
              </p>
              <p className="font-medium text-gray-800 mt-1 break-all">
                {user.email || "Not provided"}
              </p>
            </div>

            {/* Phone */}
            <div>
              <p className="text-sm text-gray-500">
                Phone
              </p>
              <p className="font-medium text-gray-800 mt-1">
                {user.phone || "Not provided"}
              </p>
            </div>

            {/* Location */}
            <div>
              <p className="text-sm text-gray-500">
                Location
              </p>
              <p className="font-medium text-gray-800 mt-1">
                {user.location || "Not provided"}
              </p>
            </div>

            {/* Experience */}
            <div>
              <p className="text-sm text-gray-500">
                Experience
              </p>
              <p className="font-medium text-gray-800 mt-1">
                {user.experience || 0} years
              </p>
            </div>

            {/* Role */}
            <div>
              <p className="text-sm text-gray-500">
                Role
              </p>
              <p className="font-medium text-gray-800 mt-1 capitalize">
                {user.role || "user"}
              </p>
            </div>

          </div>

          {/* Skills */}
          <div className="mt-6">

            <p className="text-sm text-gray-500 mb-2">
              Skills
            </p>

            {skills.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-gray-800">
                Not provided
              </p>
            )}

          </div>

          {/* Bio */}
          <div className="mt-6">

            <p className="text-sm text-gray-500 mb-2">
              Bio
            </p>

            <p className="text-gray-800 leading-6">
              {user.bio || "No bio added yet."}
            </p>

          </div>

        </div>

        {/* Bottom Buttons */}
        <div className="flex gap-4 mt-8 pt-6 border-t">

          <button
            onClick={() => navigate("/profile/update")}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Update Profile
          </button>

          <button
            onClick={() => navigate("/dashboard")}
            className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition"
          >
            Back to Dashboard
          </button>

        </div>

      </div>

    </div>
  );
};

export default UserProfile;