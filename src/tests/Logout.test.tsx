import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Logout from "../pages/Logout";

// Mock Firebase Auth so it doesn’t try to call real API
jest.mock("firebase/auth", () => ({
  signOut: jest.fn().mockResolvedValue(undefined),
}));
jest.mock("../lib/firebase", () => ({
  auth: {},
}));

test("renders Logout component", () => {
  const { asFragment } = render(
    <MemoryRouter>
      <Logout />
    </MemoryRouter>
  );

  expect(asFragment()).toMatchSnapshot();
});
