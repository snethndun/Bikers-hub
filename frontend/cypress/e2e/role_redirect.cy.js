describe("Role-Based Redirection", () => {
  it("should redirect a biker to the home page", () => {
    cy.visit("/login");
    cy.get('input[name="email"]').type("kasun@gmail.com");
    cy.get('input[name="password"]').type("12345678");
    cy.get('button[type="submit"]').click();

    cy.url().should("include", "/");
  });

  it("should redirect a garage owner to the dashboard", () => {
    cy.visit("/login");
    cy.get('input[name="email"]').type("garageowner@gmail.com");
    cy.get('input[name="password"]').type("12345678");
    cy.get('button[type="submit"]').click();

    cy.url().should("include", "/GarageDashboard");
  });
});
