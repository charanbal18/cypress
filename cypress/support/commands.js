Cypress.Commands.add("seedDatabase", () => {
    cy.fixture("users").then((users) => {
        cy.request("POST", "http://localhost:5000/seed-database", { users })
          .its("status")
          .should("eq", 200);
    });
});