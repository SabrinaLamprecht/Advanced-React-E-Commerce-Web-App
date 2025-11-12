//src/styles/cardStyles.ts
import type { Properties } from "csstype";

export const cardStyle = {
  height: "100%",
  minHeight: "400px",
  borderRadius: "0.5rem",
  backgroundColor: "white",
  boxShadow: "0 4px 8px 4px rgba(255, 215, 0, 0.6)",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "1rem",
  overflow: "visible",
  boxSizing: "border-box",
  width: "100%",
};

export const imgStyle: Properties<string> = {
  objectFit: "contain",
  maxHeight: "200px",
  maxWidth: "100%",
  borderRadius: "10px",
};
