// src/__tests__/Logout.test.tsx

import React from "react";
import { render, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Logout from "../pages/Logout";

// Mock Firebase Auth
const mockSignOut = jest.fn().mockResolvedValue(undefined);
jest.mock("firebase/auth", () => ({
  signOut: (...args) => mockSignOut(...args),
}));

// Mock Firebase Auth Object - Ensures no real Firebase API calls occur
jest.mock("../lib/firebase", () => ({
  auth: {},
}));

// Mock useNavigate - Allows verifying navigation behavior (user interaction/side effect)
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("Logout Component", () => {
  test("calls signOut and navigates to /login", async () => {
    // Component rendering test (requirement)
    render(
      <MemoryRouter>
        <Logout />
      </MemoryRouter>
    );

    // Ensures signOut (logout action) was triggered - tests user interactions (requirement)
    await waitFor(() => expect(mockSignOut).toHaveBeenCalledTimes(1));

    // Verifies navigation after logout
    expect(mockNavigate).toHaveBeenCalledWith("/login");
  });

  test("renders logout message", () => {
    // Focused rending test (requirement)
    const { getByText } = render(
      <MemoryRouter>
        <Logout />
      </MemoryRouter>
    );

    // Confirms correct UI output
    expect(getByText(/Logging you out.../i)).toBeInTheDocument();
  });
});
