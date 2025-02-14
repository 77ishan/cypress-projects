class LoginPage {
  visit() {
    cy.visit('/login');
  }

  fillLoginInfo(username, password) {
    cy.get('input[placeholder="Enter your username here"]').type(username);
    cy.get('input[placeholder="Enter your password here"]').type(password);
  }

  // fillWrongLoginInfo(wrongUsername, wrongPassword) {
  //   cy.get('input[placeholder="Enter your username here"]').type(wrongUsername);
  //   cy.get('input[placeholder="Enter your password here"]').type(wrongPassword);
  // }

  clickSignInButton() {
    cy.get('button').contains('Sign In Now').click();
  }

  assertionEmptyFields() {
    cy.contains('The username field is empty.').should('be.visible');
    cy.contains('The password field is empty.').should('be.visible');
  }

  
  assertLoginButtonVisible() {
    cy.get('button').contains('Sign In Now').should('be.visible');
  }

  assertLogoutButtonVisible() {
    cy.get('button.logout').should('be.visible');
    
  }

  assertErrorMessageVisible(errorMessage) {
    cy.contains(errorMessage).should('be.visible');
  }

  loginWithUnregisteredUser(username, password) {
    this.visit();
    this.fillLoginInfo(username, password);
    this.clickSignInButton();
    const errorMessage = `${username} is not registered on this site. If you are unsure of your username, try your email address instead.`;
    this.assertErrorMessageVisible(errorMessage); 
    this.assertLoginButtonVisible(); 
  }
}

export default LoginPage;
