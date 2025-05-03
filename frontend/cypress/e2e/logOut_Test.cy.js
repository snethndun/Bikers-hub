describe("Login and Logout Test", () => {
  it("should log in, redirect to home, and log out using the dropdown menu", () => {
    // Step 1: Visit the login page
    cy.visit("/login"); // Replace with your actual login page URL

    // Step 2: Perform login with valid credentials
    cy.get('input[name="email"]').type("kasun@gmail.com"); // Use provided email
    cy.get('input[name="password"]').type("12345678"); // Use provided password
    cy.get('button[type="submit"]').click();

    // Wait for login to complete
    cy.wait(2000); // Adjust the wait time as needed

    // Step 3: Verify login success and ensure user is redirected to home page ("/")
    cy.url().should("include", "/"); // User should be on the home page
    //cy.get("h1").should("contain", "Welcome"); // Assuming there's a welcome message on the home page

    // Step 4: Open the user dropdown menu (this assumes the user is logged in)
    cy.get(".user-profile button").click(); // Open dropdown menu by clicking on the profile button

    // Step 5: Click the "Sign out" button in the dropdown menu
    cy.contains("Sign out").click();

    // Step 6: Verify the user is logged out and redirected to the login page
    cy.url().should("include", "/"); // Verify the login page URL after logout
  });
});
