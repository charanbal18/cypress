describe('Demo Web Shop - Add to Cart Test', () => {
  it('searches for a simple product and adds it to the cart', () => {
    cy.visit('https://demowebshop.tricentis.com/');

    // Search for a term that returns simple products
    cy.get('#small-searchterms').type('shirt{enter}');

    // Wait for results to load and find a product with an Add to cart button
    cy.get('.product-item').each(($el) => {
      if ($el.find('input[value="Add to cart"]').length) {
        cy.wrap($el).find('input[value="Add to cart"]').click();
        return false; // break out of the .each loop
      }
    });

    // Assert that the cart count has increased
    cy.get('.cart-qty').should('not.have.text', '(0)');
  });
});
