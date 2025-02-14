
class LoginPage{
  visit(){
    cy.visit ('/login') 
  };
fillLoginInfo(username,password){
  cy.get('input[placeholder="Enter your username here"]').type(username);
  cy.get('input[placeholder="Enter your password here"]').type(password);
}
fillWrongLoginInfo(username,password){
  cy.get('input[placeholder="Enter your username here"]').type(username);
  cy.get('input[placeholder="Enter your password here"]').type(password);
}
clickSignInButton(){
  cy.get('button').contains('Sign In Now').click(); 
};
assertionEmptyFields(){
  cy.contains('Username is required').should('be.visible');
  cy.contains('Password is required').should('be.visible');
};
}
export default LoginPage;