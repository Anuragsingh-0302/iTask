// src/pages/Profile.jsx

import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

const Profile = () => {
  const { user, setUser, token } = useContext(AuthContext);

  const [editing, setEditing] = useState({ name: false, phone: false });
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // ✅ Profile update handler
  const handleUpdateProfile = async () => {
    try {
      setLoading(true);
      const res = await axios.put(
        "http://localhost:5000/api/auth/update-profile",
        formData,
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      setUser(res.data.user);
      setMessage("✅ Profile updated successfully");
      setEditing({ name: false, phone: false });
    } catch (err) {
      setMessage(err.response?.data?.error || "❌ Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Change password handler
  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      return setMessage("❌ Passwords do not match");
    }

    try {
      setLoading(true);
      const res = await axios.put(
        "http://localhost:5000/api/auth/change-password",
        {
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword,
          confirmPassword: passwordData.confirmPassword,
        },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      setMessage(res.data.message || "✅ Password changed successfully");
      setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (err) {
      setMessage(err.response?.data?.message || "❌ Failed to change password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto my-10 p-8 bg-white shadow-2xl rounded-2xl border border-gray-100">
      {/* Title */}
      <h1 className="text-3xl font-bold mb-8 text-center text-blue-700 tracking-wide">
        ⚙️ Profile Settings
      </h1>

      {/* Message */}
      {message && (
        <div
          className={`mb-6 p-4 text-sm rounded-lg font-medium shadow-sm ${
            message.startsWith("✅")
              ? "bg-green-100 text-green-700 border border-green-300"
              : "bg-red-100 text-red-700 border border-red-300"
          }`}
        >
          {message}
        </div>
      )}

      {/* Profile Info Section */}
      <div className="mb-10">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          Personal Information
        </h2>

        <div className="space-y-5">
          {/* Name */}
          <div className="flex items-center justify-between">
            <label className="font-medium text-gray-600 w-1/3">Name:</label>
            {editing.name ? (
              <input
                type="text"
                className="border p-2 rounded-md w-2/3 focus:ring-2 focus:ring-blue-400 outline-none"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            ) : (
              <span className="w-2/3 text-gray-800">{formData.name}</span>
            )}
            <button
              onClick={() => setEditing({ ...editing, name: !editing.name })}
              className="ml-3 text-sm font-medium text-blue-600 hover:text-blue-800"
            >
              {editing.name ? "Cancel" : "Edit"}
            </button>
          </div>

          {/* Email */}
          <div className="flex items-center justify-between">
            <label className="font-medium text-gray-600 w-1/3">Email:</label>
            <span className="w-2/3 text-gray-800">{formData.email}</span>
          </div>

          {/* Phone */}
          <div className="flex items-center justify-between">
            <label className="font-medium text-gray-600 w-1/3">Phone:</label>
            {editing.phone ? (
              <input
                type="text"
                className="border p-2 rounded-md w-2/3 focus:ring-2 focus:ring-blue-400 outline-none"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
              />
            ) : (
              <span className="w-2/3 text-gray-800">
                {formData.phone || "Not added"}
              </span>
            )}
            <button
              onClick={() => setEditing({ ...editing, phone: !editing.phone })}
              className="ml-3 text-sm font-medium text-blue-600 hover:text-blue-800"
            >
              {editing.phone ? "Cancel" : "Edit"}
            </button>
          </div>
        </div>

        {/* Save Changes */}
        {(editing.name || editing.phone) && (
          <div className="mt-6 text-right">
            <button
              onClick={handleUpdateProfile}
              disabled={loading}
              className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
            >
              {loading ? "Updating..." : "💾 Save Changes"}
            </button>
          </div>
        )}
      </div>

      {/* Divider */}
      <hr className="my-8 border-gray-200" />

      {/* Change Password Section */}
      <div>
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          Change Password
        </h2>
        <form onSubmit={handleChangePassword} className="space-y-4">
          <input
            type="password"
            placeholder="Current Password"
            className="border p-3 rounded-md w-full focus:ring-2 focus:ring-blue-400 outline-none"
            value={passwordData.currentPassword}
            onChange={(e) =>
              setPasswordData({ ...passwordData, currentPassword: e.target.value })
            }
            required
          />
          <input
            type="password"
            placeholder="New Password"
            className="border p-3 rounded-md w-full focus:ring-2 focus:ring-blue-400 outline-none"
            value={passwordData.newPassword}
            onChange={(e) =>
              setPasswordData({ ...passwordData, newPassword: e.target.value })
            }
            required
          />
          <input
            type="password"
            placeholder="Confirm New Password"
            className="border p-3 rounded-md w-full focus:ring-2 focus:ring-blue-400 outline-none"
            value={passwordData.confirmPassword}
            onChange={(e) =>
              setPasswordData({ ...passwordData, confirmPassword: e.target.value })
            }
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white px-5 py-3 rounded-lg font-medium hover:bg-green-700 transition disabled:opacity-50"
          >
            {loading ? "Changing..." : "🔑 Change Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
