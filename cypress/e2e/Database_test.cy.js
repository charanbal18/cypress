describe("Database Seeding & Cleanup", () => {
    beforeEach(() => {
        cy.request("POST", "http://localhost:5000/reset-database");
        cy.seedDatabase();
    });

    it("Checks if seeded data is available", () => {
        cy.request("GET", "http://localhost:5000/get-users")
          .its("body")
          .should("have.length.at.least", 2);
    });

    afterEach(() => {
        cy.request("POST", "http://localhost:5000/reset-database");
    });
});