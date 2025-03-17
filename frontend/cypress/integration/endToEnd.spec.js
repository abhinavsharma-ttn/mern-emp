describe('Website Availability', () => {
  const FRONTEND_URL = Cypress.env('FRONTEND_URL') || 'http://localhost:5173';

  after(() => {
    cy.contains("Delete").click({ force: true });
  });

  it('Sanity Listings Web Site', () => {
    cy.visit(`${FRONTEND_URL}`);
    cy.contains('Create Record').should('exist');
  });

  it('Test Adding Employee Listings', () => {
    cy.visit(`${FRONTEND_URL}/create`);
    cy.get('#name').type("Employee1");
    cy.get('#position').type("Position1");
    cy.get("#positionIntern").click({ force: true });
    cy.contains("Create person").click({ force: true });
    cy.visit(`${FRONTEND_URL}`);
    cy.contains('Employee1').should('exist');
  });

  it('Test Editing Employee Listings', () => {
    cy.visit(`${FRONTEND_URL}`);
    cy.contains('Edit').click({ force: true });
    cy.url().then(url => {
      cy.visit(url);
      cy.get('#position').clear().type("Position2");
      cy.contains("Update Record").click({ force: true });
      cy.visit(`${FRONTEND_URL}`);
      cy.contains('Position2').should('exist');
    });
  });
});
