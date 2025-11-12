//src/pages/Register.tsx

import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../lib/firebase";
import styles from "../styles/auth-styles";
import { useNavigate } from "react-router-dom";

// Typed style objects
const cardStyleTyped: CSSProperties = {
  ...styles.card,
  marginTop: "5rem",
};

const fieldsetStyleTyped: CSSProperties = {
  ...styles.fieldset,
};

const legendStyleTyped: CSSProperties = {
  ...styles.legend,
};

// States for the form inputs
const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");
    try {
      // Create user with email and password using firebase auth
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      // Update user proile with displayName after user is created
      await updateProfile(userCredential.user, {
        displayName: displayName,
      });
      navigate("/profile");
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div style={styles.form}>
      <div style={cardStyleTyped}>
        <h1 style={styles.heading}>Register</h1>
        <form onSubmit={handleSubmit}>
          {error && <p style={styles.error}>{error}</p>}
          <fieldset style={fieldsetStyleTyped}>
            <legend style={styles.legend}>Create Account</legend>

            <label style={styles.label}>
              Full Name
              <input
                style={styles.input}
                type="text"
                placeholder="Enter your full name"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
              />
            </label>

            <label style={styles.label}>
              Email
              <input
                style={styles.input}
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>

            <label style={styles.label}>
              Password
              <input
                style={styles.input}
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>

            <button
              type="submit"
              style={styles.button}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor =
                  styles.buttonHover.backgroundColor)
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor =
                  styles.button.backgroundColor)
              }
            >
              Register
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default Register;
