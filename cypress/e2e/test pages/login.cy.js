describe('User Login Test', () => {
    let userData;
  
    before(() => {
      // Load user credentials from fixture file
      cy.fixture('userData').then((data) => {
        userData = data;
      });
    });
  
    it('Should log in with registered user credentials', () => {
      cy.visit('/login');
  
      cy.get('input[placeholder="Enter your username here"]').type(userData.username);
      cy.get('input[placeholder="Enter your password here"]').type(userData.password);
      cy.get('button').contains('Sign In Now').click();

      cy.wait(3000); 
      cy.get('button').contains('Logout').should('be.visible').click();
    });
  
    it('Should not allow login with incorrect password', () => {
      cy.visit('/login');
  
      cy.get('input[placeholder="Enter your username here"]').type(userData.username);
      cy.get('input[placeholder="Enter your password here"]').type('WrongPass123!');
      cy.get('button').contains('Sign In Now').click();
  
      cy.wait(2000); 

      cy.contains('Invalid credentials').should('be.visible');
    });
});
