class RegisterPage {
visit(){
  cy.visit('/register') 
};

fillRegisterInfo(userName,firstName,lastName,email,password){
  cy.get('input[placeholder="Enter your username here"]').type(userName);
  cy.get('input[placeholder="Enter your first name here"]').type(firstName);
  cy.get('input[placeholder="Enter your last name here"]').type(lastName);
  cy.get('input[placeholder="Enter your email address here"]').type(email);
  cy.get('input[placeholder="Enter your email address again"]').type(email);
  cy.get('input[placeholder="Enter your password here"]').type(password);
  cy.get('input[placeholder="Enter your password again"]').type(password);
};

clickRegisterButton(){
  cy.get('button').contains('Register').click(); 
};

verifyRegisterSucess(){
  cy.url().should('include', '/login');
};
clickRegisterButton(){
  cy.get('button').contains('Register').click(); 
};
}
export default RegisterPage