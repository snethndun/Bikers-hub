// src/components/GarageList.cy.jsx
import React from "react";
import GarageList from "./GarageList";
import * as firestore from "firebase/firestore";
import { db } from "../firebase";

// Stub the HomeGarageCard
vi.mock("./HomeGarageCard", () => ({
  __esModule: true,
  default: ({ garage }) => <div>{garage.name}</div>,
}));

// Stub Firebase Firestore functions
vi.mock("../firebase", async () => {
  const original = await vi.importActual("../firebase");
  return {
    ...original,
    db: {}, // mock db object
  };
});

describe("GarageList component", () => {
  beforeEach(() => {
    // Mock Firestore functions
    vi.spyOn(firestore, "collection").mockReturnValue("garages-collection");
    vi.spyOn(firestore, "getDocs").mockResolvedValue({
      docs: [
        {
          id: "1",
          data: () => ({ name: "Garage A", location: "City A" }),
        },
        {
          id: "2",
          data: () => ({ name: "Garage B", location: "City B" }),
        },
      ],
    });
  });

  it("displays loading initially and renders garages after fetch", () => {
    cy.mount(<GarageList />);
    cy.contains("Loading..."); // Should show loading

    // Wait for mocked data to load
    cy.contains("Garage A").should("exist");
    cy.contains("Garage B").should("exist");
  });
});
