import RegisterPage from "../pages/registerPage";
describe('User Registration Test', () => {
 const registerPage = new RegisterPage() ;     
    const generateRandomString = (length) => {
      const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
      return Array.from({ length }, () => characters.charAt(Math.floor(Math.random() * characters.length))).join('');
    };
  
    const generateRandomEmail = () => {
      return `${generateRandomString(5)}@gmail.com`;
    };
  
    let generatedUsername, generatedPassword, generatedEmail;
  
    beforeEach(() => {
      generatedUsername = generateRandomString(8);
      generatedPassword = `${generateRandomString(12)}A1@`;
      generatedEmail = generateRandomEmail();
    });              
  
    it('Should register a new user successfully', () => {
    
    cy.visit('/register');
    registerPage.fillRegisterInfo(generatedUsername,Cypress.env('firstName'),Cypress.env('lastName'),generatedEmail,generatedPassword);
  
      cy.get('button').contains('Register').click();
  
      cy.url().should('include', '/login');
    });
  });