// cypress/e2e/biker_login.cy.js
describe("Biker Login Test", () => {
  it("should log in successfully using email and password", () => {
    // Log to see if visit is working
    console.log("Attempting to visit the page...");
    cy.visit("http://localhost:5173/login"); // Change to the correct URL
    cy.url().should("include", "/login"); // Ensure we're on the login page

    // Login using email and password
    cy.get('input[name="email"]') // Select the email input field
      .type("kasun@gmail.com"); // Type the email
    cy.get('input[name="password"]') // Select the password input field
      .type("12345678"); // Type the password
    cy.get('button[type="submit"]') // Click the submit button
      .click();

    // Wait for login process
    cy.wait(2000); // Wait for redirection to happen

    // Check if the login was successful (verify the redirection URL)
    cy.url().should("include", "/"); // Redirect to home page or dashboard depending on user role

    // Check for the presence of an element on the HomePage (e.g., main heading or content)
    cy.get("h1") // Assuming there's an <h1> element on the HomePage
      .should("be.visible"); // Or use a more specific element in the HomePage component
  });
});
