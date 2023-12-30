/// <reference types="cypress" />

context('Login page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200/sign-up');
  });

  it('It should sign up', () => {
    cy.get('h1').should('contain.text', 'Register');
    cy.get('.email').should('have.attr', 'placeholder', 'Email');
    cy.get('.password').should('have.attr', 'placeholder', 'Password');
    cy.get('.submitButton').should('have.text', ' Sign Up ');
    cy.get('.authLink').should('have.text', 'Go to Sign In');
  });
});
