import React from "react";
import { MemoryRouter } from "react-router-dom";
import { mount } from "cypress/react";
import Navbar from "../../src/components/Navbar"; // adjust path as needed
import { onAuthStateChanged } from "firebase/auth";

// Mock Firebase Auth
jest.mock("firebase/auth", () => {
  return {
    onAuthStateChanged: jest.fn(),
    signOut: jest.fn(),
  };
});

describe("Navbar Component", () => {
  it("renders login button when user is not logged in", () => {
    // Simulate no user
    onAuthStateChanged.mockImplementation((auth, callback) => callback(null));

    mount(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    cy.contains("Login").should("be.visible");
  });

  it("shows user dropdown when user is logged in", () => {
    const mockUser = {
      uid: "123",
      email: "kasun@gmail.com",
      photoURL: "",
    };

    onAuthStateChanged.mockImplementation((auth, callback) =>
      callback(mockUser)
    );

    mount(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    // Check user profile image appears (dropdown closed by default)
    cy.get(".user-profile button").should("exist");
  });
});
