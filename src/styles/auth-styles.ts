// src/styles/auth-styles.ts
import type { Properties } from "csstype";

const styles: { [key: string]: Properties<string | number> } = {
  form: {
    display: "flex" as const,
    flexDirection: "column" as const,
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    backgroundColor: "#f8f9fa",
  },
  card: {
    backgroundColor: "#fff",
    padding: "2rem",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    width: "100%",
    maxWidth: "400px",
    display: "flex" as const,
    flexDirection: "column" as const,
  },
  heading: {
    textAlign: "center" as const,
    marginBottom: "1.5rem",
  },
  fieldset: {
    border: "none",
    display: "flex" as const,
    flexDirection: "column" as const,
    gap: "1rem",
  },
  legend: {
    fontWeight: "600",
    fontSize: "1.2rem",
    marginBottom: "0.5rem",
    display: "flex" as const,
    flexDirection: "column" as const,
  },
  label: {
    display: "flex" as const,
    flexDirection: "column" as const,
    fontSize: "0.9rem",
  },
  input: {
    padding: "0.6rem",
    border: "1px solid #ced4da",
    borderRadius: "8px",
    marginTop: "0.25rem",
    fontSize: "1rem",
  },
  button: {
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    padding: "0.75rem 1rem",
    cursor: "pointer",
    fontSize: "1rem",
    marginTop: "1rem",
    transition: "background-color 0.3s ease",
  },
  buttonHover: {
    backgroundColor: "#0056b3",
  },
  error: {
    color: "red",
    textAlign: "center" as const,
    marginBottom: "1rem",
  },
};

export default styles;
