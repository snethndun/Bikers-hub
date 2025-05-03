describe("Page Navigation Test", () => {
  it("should navigate to the Home Page from the Login Page", () => {
    cy.visit("http://localhost:5173/login"); // Visit the login page
    cy.get('input[name="email"]').type("kasun@gmail.com"); // Enter email
    cy.get('input[name="password"]').type("12345678"); // Enter password
    cy.get('button[type="submit"]').click(); // Submit the form

    // Verify that we are redirected to the home page
    cy.url().should("include", "/");
  
  });

  it("should navigate to the Garage Dashboard for a Garage Owner", () => {
    cy.visit("http://localhost:5173/login"); // Visit the login page
    cy.get('input[name="email"]').type("garageowner@gmail.com"); // Enter garage owner's email
    cy.get('input[name="password"]').type("12345678"); // Enter password
    cy.get('button[type="submit"]').click(); // Submit the form

    // Verify that the garage owner is redirected to their dashboard
    cy.url().should("include", "/GarageDashboard");
    
  });

  it("should navigate to the Login Page from the Home Page", () => {
    cy.visit("http://localhost:5173/"); // Visit the home page

    // Click on a "Logout" or "Login" button if available (e.g., assuming there's a link to login)
    cy.get('a[href="/login"]').click();

    // Verify that we are redirected to the login page
    cy.url().should("include", "/login");
  });

  it("should navigate to the About Us Page from the Home Page", () => {
    cy.visit("http://localhost:5173/"); // Visit the home page

    // Click on the "About Us" link (assuming there's a link to About Us)
    cy.get('a[href="/about"]').click();

    // Verify that we are redirected to the About Us page
    cy.url().should("include", "/about");
    cy.get("h1").should("contain", "About Us"); // Check if the About Us page title is visible
  });
});
