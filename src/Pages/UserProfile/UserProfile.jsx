import axios from "axios";
import { useEffect, useState } from "react";
import PhoneInput from "../../Components/PhoneInput";

export default function UserProfile() {
  const [userData, setUserData] = useState(null);
  // const [selectedImage, setSelectedImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    mobile: "",
  });
  const [formErrors, setFormErrors] = useState({
    mobile: "",
  });

  // Egyptian phone number validation regex
  const phoneRegex = /^(02)?01[0125][0-9]{8}$/;

  async function getUserData() {
    try {
      const response = await axios.get(
        "https://brightminds.runasp.net/api/Account/UserProfile",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setUserData(response.data.data);
      setFormData({
        firstName: response.data.data.firstName || "",
        lastName: response.data.data.lastName || "",
        mobile: response.data.data.mobile || "",
      });
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }

  async function handleImageUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    // setSelectedImage(file);
    setPreview(URL.createObjectURL(file));

    const imageFormData = new FormData();
    imageFormData.append("Image", file); // Adjust key name if your backend expects something different
    imageFormData.append("firstName", userData.firstName);
    imageFormData.append("lastName", userData.lastName);
    imageFormData.append("mobile", userData.mobile);

    try {
      setIsUploading(true);
      const response = await axios.put(
        "https://brightminds.runasp.net/api/Account",
        imageFormData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("Upload success:", response.data);
      await getUserData(); // Refresh profile
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setIsUploading(false);
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Phone validation is now handled by PhoneInput component
    if (name !== "mobile" && name in formErrors) {
      setFormErrors({
        ...formErrors,
        [name]: "",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // No need to validate mobile here as PhoneInput handles it

    try {
      const updateFormData = new FormData();
      updateFormData.append("firstName", formData.firstName);
      updateFormData.append("lastName", formData.lastName);
      updateFormData.append("mobile", formData.mobile);

      const response = await axios.put(
        "https://brightminds.runasp.net/api/Account",
        updateFormData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("Update success:", response.data);
      await getUserData(); // Refresh profile
      setIsEditing(false);
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-sm rounded-xl overflow-hidden border border-gray-100">
          {/* Header */}
          <div className="bg-white border-b border-gray-100 px-8 py-6">
            <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
            <p className="mt-1 text-sm text-gray-500">
              Manage your personal information and settings
            </p>
          </div>

          {userData ? (
            <div className="p-8">
              <div className="md:flex items-start gap-10">
                {/* Profile Image Section */}
                <div className="flex flex-col items-center mb-8 md:mb-0">
                  <div className="relative group">
                    <div className="w-40 h-40 rounded-full overflow-hidden border border-gray-200 shadow-sm">
                      <img
                        src={
                          preview ||
                          userData.imageCover ||
                          "https://via.placeholder.com/150?text=Profile"
                        }
                        alt="User"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute inset-0 bg-black bg-opacity-40 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                      <label className="cursor-pointer p-3 rounded-full bg-white text-blue-600 hover:bg-blue-50 transition shadow-md">
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleImageUpload}
                        />
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                      </label>
                    </div>
                  </div>
                  {isUploading && (
                    <div className="mt-3 text-blue-600 flex items-center">
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-blue-600"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Uploading...
                    </div>
                  )}
                  <div className="mt-4 text-gray-700 text-center font-medium text-lg">
                    {userData.displayName}
                  </div>
                  <div className="mt-1 text-gray-500 text-center text-sm">
                    {userData.email}
                  </div>
                </div>

                {/* Profile Details Section */}
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-medium text-gray-800">
                      Personal Information
                    </h2>
                    {!isEditing ? (
                      <button
                        onClick={() => setIsEditing(true)}
                        className="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100 transition"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 mr-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                          />
                        </svg>
                        Edit Profile
                      </button>
                    ) : (
                      <button
                        onClick={() => setIsEditing(false)}
                        className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200 transition"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 mr-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                        Cancel
                      </button>
                    )}
                  </div>

                  {isEditing ? (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            First Name
                          </label>
                          <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Last Name
                          </label>
                          <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Email
                        </label>
                        <input
                          type="email"
                          value={userData.email || ""}
                          disabled
                          className="w-full px-3 py-2 border border-gray-200 bg-gray-50 rounded-md text-gray-500"
                        />
                        <p className="mt-1 text-xs text-gray-500">
                          Your email cannot be changed
                        </p>
                      </div>
                      <PhoneInput
                        value={formData.mobile}
                        onChange={handleInputChange}
                        name="mobile"
                        id="profile-mobile"
                        label="Phone Number"
                      />
                      <div className="pt-4">
                        <button
                          type="submit"
                          className="w-full py-2 px-4 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                        >
                          Save Changes
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                          <p className="text-sm text-gray-500 mb-1">
                            First Name
                          </p>
                          <p className="font-medium text-gray-900">
                            {userData.firstName || "Not provided"}
                          </p>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                          <p className="text-sm text-gray-500 mb-1">
                            Last Name
                          </p>
                          <p className="font-medium text-gray-900">
                            {userData.lastName || "Not provided"}
                          </p>
                        </div>
                      </div>

                      <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                        <p className="text-sm text-gray-500 mb-1">
                          Phone Number
                        </p>
                        <p className="font-medium text-gray-900">
                          {userData.mobile || "Not provided"}
                        </p>
                      </div>

                      <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                        <div className="flex items-start">
                          <div className="shrink-0 pt-0.5">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5 text-blue-600"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                          </div>
                          <div className="ml-3">
                            <p className="text-sm text-blue-700">
                              Keep your profile information up to date to ensure
                              you receive important notifications.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="p-8 flex justify-center">
              <div className="flex items-center space-x-3">
                <svg
                  className="animate-spin h-5 w-5 text-blue-600"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                <p className="text-gray-600 font-medium">
                  Loading profile information...
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
