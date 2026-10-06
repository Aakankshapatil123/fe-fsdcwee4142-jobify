import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import instance from "../instances/instance";

const Resume = () => {
    const navigate = useNavigate();

    const [resume, setResume] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleFileChange = (event) => {
        const file = event.target.files[0];

        if (!file) {
            return;
        }

        // Only PDF
        if (file.type !== "application/pdf") {
            toast.error("Please select a PDF file");
            return;
        }

        // Maximum 5MB
        if (file.size > 5 * 1024 * 1024) {
            toast.error("Resume size should be less than 5MB");
            return;
        }

        setResume(file);
    };

    const handleUpload = async (event) => {
        event.preventDefault();

        if (!resume) {
            toast.error("Please select your resume");
            return;
        }

        try {
            setLoading(true);

            const formData = new FormData();

            // Must match backend: upload.single("resume")
            formData.append("resume", resume);

            const response = await instance.post(
                "/auth/upload/resume",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            console.log("Resume upload response:", response.data);

            // Update localStorage user
            if (response.data.user) {
                const oldUser =
                    JSON.parse(localStorage.getItem("user")) || {};

                const updatedUser = {
                    ...oldUser,
                    ...response.data.user,
                };

                localStorage.setItem(
                    "user",
                    JSON.stringify(updatedUser)
                );
            }

            toast.success("Resume uploaded successfully!");

            navigate("/dashboard");

        } catch (error) {
            console.error("Resume upload error:", error);

            console.log(
                "Backend response:",
                error.response?.data
            );

            toast.error(
                error.response?.data?.message ||
                "Failed to upload resume"
            );

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-10">

            <div className="bg-white w-full max-w-xl rounded-lg shadow-lg p-8">

                <h1 className="text-2xl font-bold text-gray-800 mb-2">
                    Upload Resume
                </h1>

                <p className="text-gray-500 mb-6">
                    Upload your latest resume to your profile.
                </p>

                <form onSubmit={handleUpload}>

                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">

                        <div className="text-5xl mb-4">
                            📄
                        </div>

                        <label className="cursor-pointer inline-block bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700 transition">

                            Choose Resume

                            <input
                                type="file"
                                accept=".pdf,application/pdf"
                                onChange={handleFileChange}
                                className="hidden"
                            />

                        </label>

                        <p className="text-sm text-gray-500 mt-3">
                            PDF only • Maximum 5MB
                        </p>

                    </div>

                    {resume && (
                        <div className="mt-5 bg-gray-50 border rounded-lg p-4">

                            <p className="text-sm text-gray-500">
                                Selected Resume
                            </p>

                            <p className="font-medium text-gray-800 mt-1 break-all">
                                📄 {resume.name}
                            </p>

                            <p className="text-xs text-gray-500 mt-1">
                                {(resume.size / 1024 / 1024).toFixed(2)} MB
                            </p>

                        </div>
                    )}

                    <div className="flex gap-4 mt-6">

                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 disabled:opacity-50 transition"
                        >
                            {loading
                                ? "Uploading..."
                                : "Upload Resume"}
                        </button>

                        <button
                            type="button"
                            onClick={() => navigate("/dashboard")}
                            className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition"
                        >
                            Cancel
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
};

export default Resume;