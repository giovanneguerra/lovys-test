/// <reference types="cypress" />

context('Login page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200/login');
  });

  it('should display login page', () => {
    cy.get('img[alt="logo"]').should(
      'have.attr',
      'src',
      '/assets/images/logo_alt.svg'
    );
    cy.get('h1').should('contain.text', 'Login');
    cy.get('.email').should('have.attr', 'placeholder', 'Email');
    cy.get('.password').should('have.attr', 'placeholder', 'Password');
    cy.get('.submitButton').should('have.text', ' Sign In ');
    cy.get('.authLink').should('have.text', 'Go to Sign Up');
  });
});
