// src/pages/Logout.tsx

import { useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../lib/firebase";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const doLogout = async () => {
      try {
        await signOut(auth);
        console.log("✅ Logged out");
        navigate("/login"); // redirect after logout
      } catch (error) {
        console.error("❌ Logout error:", error);
      }
    };

    doLogout();
  }, [navigate]);

  return (
    <div style={{ textAlign: "center", marginTop: "2rem" }}>
      <h1>Logging you out...</h1>
    </div>
  );
};

export default Logout;
