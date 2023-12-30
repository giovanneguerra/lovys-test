/// <reference types="cypress" />

context('Home page', () => {
  it('Adds document to test_hello_world collection of Firestore', () => {
    cy.callFirestore('add', 'test_hello_world', { some: 'value' });
  });
  //   it('should log in and view home page', () => {
  //     cy.login();
  //     cy.visit('localhost:4200/home');
  //     cy.get('h1').should(
  //       'contain.text',
  //       'Welcome to Movie Mash: Your Ultimate Destination for Cinematic Exploration!'
  //     );
  //   });
  afterEach(() => {
    cy.logout();
  });
});
