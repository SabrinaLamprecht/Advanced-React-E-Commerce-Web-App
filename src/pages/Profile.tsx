//src/pages/Profile.tsx

import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { updateProfile, deleteUser } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { cardStyle } from "../styles/cardStyles"; // reuse card styling
import styles from "../styles/auth-styles";

const Profile: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  // Sync state when user becomes available
  useEffect(() => {
    if (user) {
      setDisplayName(user.displayName || "");
      setEmail(user.email || "");
    }
  }, [user]);

  const handleToggleEdit = () => {
    if (isEditing) {
      handleUpdateProfile();
    } else {
      setIsEditing(true);
    }
  };

  const handleUpdateProfile = async () => {
    setError("");
    setSuccess("");
    if (!user) {
      setError("User not found");
      return;
    }
    try {
      await updateProfile(user, { displayName });
      setSuccess("Profile updated successfully");
      setIsEditing(false);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleDeleteAccount = async () => {
    setError("");
    setSuccess("");
    try {
      if (!user) {
        setError("User not found");
        return;
      }
      await deleteUser(user);
      setSuccess("Account deleted successfully");
      navigate("/");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="container pt-5 mt-5 d-flex justify-content-center">
      <div
        style={{
          ...cardStyle,
          maxWidth: 500,
          padding: "2rem",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <h2 className="text-center mb-3">Profile</h2>

        <div className="mb-3 d-flex flex-column" style={{ width: "100%" }}>
          <label className="form-label fw-bold">Display Name</label>
          <input
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            readOnly={!isEditing}
            className="form-control"
            style={{ width: "100%", minWidth: 0 }}
          />
        </div>

        <div className="mb-3 d-flex flex-column" style={{ width: "100%" }}>
          <label className="form-label fw-bold">Email</label>
          <input
            type="email"
            value={email}
            disabled
            className="form-control"
            style={{ width: "100%", minWidth: 0 }}
          />
        </div>

        {success && <p style={styles.success}>{success}</p>}
        {error && <p style={styles.error}>{error}</p>}

        <button
          type="button"
          onClick={handleToggleEdit}
          className="btn btn-warning w-100 mb-2"
        >
          {isEditing ? "Save Profile" : "Edit Profile"}
        </button>

        <button
          type="button"
          onClick={handleDeleteAccount}
          className="btn btn-danger w-100 mb-2"
        >
          Delete Account
        </button>

        <button
          type="button"
          onClick={() => navigate("/orders")}
          className="btn btn-primary w-100"
        >
          View Order History
        </button>
      </div>
    </div>
  );
};

export default Profile;
