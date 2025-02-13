
class LoginPage{
  visit(){
    cy.visit ('/login') 
  };
fillLoginInfo(username,password){
  cy.get('input[placeholder="Enter your username here"]').type(username);
  cy.get('input[placeholder="Enter your password here"]').type(password);
}
}
export default LoginPage;