//src/pages/Login.tsx

import { useState, useEffect } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../lib/firebase";
import styles from "../styles/auth-styles";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// States for the form inputs
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { user } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    try {
      // Sign in user with email and password using firebase auth
      await signInWithEmailAndPassword(auth, email, password);

      navigate("/profile");
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div style={styles.form}>
      <div style={styles.card}>
        <h1 style={styles.heading}>Login</h1>
        <form onSubmit={handleSubmit}>
          {error && <p style={styles.error}>{error}</p>}
          <fieldset style={styles.fieldset}>
            <legend style={styles.legend}>Account Details</legend>

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
              Login
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default Login;
