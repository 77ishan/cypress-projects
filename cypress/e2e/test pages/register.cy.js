describe('User Registration Test', () => {
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

    cy.get('input[placeholder="Enter your username here"]').type(generatedUsername);
    cy.get('input[placeholder="Enter your first name here"]').type(Cypress.env('firstName'));
    cy.get('input[placeholder="Enter your last name here"]').type(Cypress.env('lastName'));
    cy.get('input[placeholder="Enter your email address here"]').type(generatedEmail);
    cy.get('input[placeholder="Enter your email address again"]').type(generatedEmail);
    cy.get('input[placeholder="Enter your password here"]').type(generatedPassword);
    cy.get('input[placeholder="Enter your password again"]').type(generatedPassword);
    cy.get('button').contains('Register').click();

    cy.url().should('include', '/login');
  });
});
