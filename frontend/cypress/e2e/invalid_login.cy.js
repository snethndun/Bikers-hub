describe("Invalid Login Test", () => {
  it("should display an error message for invalid login credentials", () => {
    // Visit the login page
    cy.visit("http://localhost:5173/login"); // Update the URL with your actual app's login page URL

    // Ensure we're on the login page
    cy.url().should("include", "/login");

    // Enter invalid email and password
    cy.get('input[name="email"]').type("invalid-email@example.com"); // Invalid email
    cy.get('input[name="password"]').type("wrongpassword"); // Wrong password

    // Submit the form
    cy.get('button[type="submit"]').click();

    // Wait for the login process to complete
    cy.wait(2000); // Wait for the form submission to complete

    // Verify that the error message is displayed
    cy.get(".text-center.text-red-500") // Ensure the error message element exists
      .should("be.visible")
     // .and("contain", "Login failed!"); // Check for the default Firebase error message or your custom message

    // Optionally, check that the error message isn't just empty or incorrect
    cy.get(".text-center.text-red-500").should("not.have.text", "");
  });
});
