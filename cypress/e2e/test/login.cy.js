import LoginPage from '../pages/loginPage'
describe('User Login Test', () => {
    let userData;
    const loginPage=new LoginPage();
  
    before(() => {
      // Load user credentials from fixture file
      cy.fixture('userData').then((data) => {
        userData = data;
      });
    });
  
    it('Should log in with registered user credentials', () => {
      loginPage.visit();
        loginPage.fillLoginInfo(userData.username,userData.password)
         loginPage.clickSignInButton();
      cy.wait(3000); 
      cy.get('button').contains('Logout').should('be.visible').click();
    });
  
    it('Should not allow login with incorrect password', () => {
      loginPage.visit();
  
      loginPage.fillWrongLoginInfo(userData.username,'wrongpassword');
      loginPage.clickSignInButton();
  
      cy.wait(2000); 

      cy.contains('Invalid credentials').should('be.visible');
        cy.get('button').contains('Sign In Now').should('be.visible');
    });

    it('Should not allow login with empty credentials', () => {
        loginPage.visit();
        loginPage.clickSignInButton();

        // Validate error messages for empty fields
        loginPage.assertionEmptyFields();
    });

    it('Should not allow login with an unregistered user', () => {
        loginPage.visit();
        loginPage.fillLoginInfo('nonexistentUser', 'randomPassword123');
        loginPage.clickSignInButton(); 

        // Validate error message for unregistered user
        cy.contains('Invalid credentials').should('be.visible');

        // Ensure login button is still visible, confirming login failed
        cy.get('button').contains('Sign In Now').should('be.visible');
    });

    it('Should ensure logout functionality works correctly', () => {
        loginPage.visit();
        loginPage.fillLoginInfo(userData.username, userData.password);
        cy.get('button').contains('Sign In Now').click();


        // Verify user is logged in by checking for the logout button
        cy.get('button').contains('Logout').should('be.visible');

        // Click logout
        cy.get('button').contains('Logout').click();

        // Ensure redirection to login page after logout
        cy.url().should('include', '/login');

    });
});