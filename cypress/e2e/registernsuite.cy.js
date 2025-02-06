describe('User Registration and Login Test', () => {

  const generateRandomString = (length) => {
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    return Array.from({ length }, () => characters.charAt(Math.floor(Math.random() * characters.length))).join('');
  };

  const generateRandomEmail = () => {
    const username = generateRandomString(5);
    return `${username}@gmail.com`;
  };

  let generatedUsername, generatedPassword, generatedEmail;

  beforeEach(() => {
    generatedUsername = generateRandomString(8);
    generatedPassword = `${generateRandomString(12)}A1@`;
    generatedEmail = generateRandomEmail();
  });

  const visitLoginPage = () => cy.visit('https://receive-smss.com/login/');
  const visitRegisterPage = () => cy.visit('https://receive-smss.com/register/');

  const registerUser = () => {
    cy.get('input[placeholder="Enter your username here"]').type(generatedUsername);
    cy.get('input[placeholder="Enter your first name here"]').type('Ishan');
    cy.get('input[placeholder="Enter your last name here"]').type('Rai');
    cy.get('input[placeholder="Enter your email address here"]').type(generatedEmail);
    cy.get('input[placeholder="Enter your email address again"]').type(generatedEmail);
    cy.get('input[placeholder="Enter your password here"]').type(generatedPassword);
    cy.get('input[placeholder="Enter your password again"]').type(generatedPassword);
    cy.get('button').contains('Register').click();
  };

  const loginUser = (username, password) => {
    cy.get('input[placeholder="Enter your username here"]').type(username);
    cy.get('input[placeholder="Enter your password here"]').type(password);
    cy.get('button').contains('Sign In Now').click();
  };

  const saveTestData = (data, format = 'json') => {
    const filePath = `testedData.${format}`;
    if (format === 'json') {
      cy.writeFile(filePath, data, { flag: 'a+' });
    } else if (format === 'csv') {
      const csvData = `${data.username},${data.email},${data.password}\n`;
      cy.writeFile(filePath, csvData, { flag: 'a+' });
    }
  };

  it('Should register a new user successfully and then log in', () => {
    visitRegisterPage();
    registerUser();
    cy.url().should('include', '/login');

    // Save tested data to JSON and CSV
    const userData = {
      username: generatedUsername,
      email: generatedEmail,
      password: generatedPassword
    };
    saveTestData(userData, 'json');
    saveTestData(userData, 'csv');

    cy.wait(8000);
    loginUser(generatedUsername, generatedPassword);
    cy.wait(8000);
    cy.get('button').contains('Logout').click();
  });

  it('Should not allow login with an unregistered username', () => {
    visitLoginPage();
    const unregisteredUsername = generateRandomString(10);
    loginUser(unregisteredUsername, generatedPassword);

    // Save tested data to JSON and CSV
    const testData = {
      username: unregisteredUsername,
      password: generatedPassword,
      testCase: 'Login with unregistered username'
    };
    saveTestData(testData, 'json');
    saveTestData(testData, 'csv');

    cy.wait(5000);
  });

  it('Should not allow login with incorrect password', () => {
    visitLoginPage();
    const incorrectPassword = `${generateRandomString(12)}B2$`;
    loginUser(generatedUsername, incorrectPassword);

    // Save tested data to JSON and CSV
    const testData = {
      username: generatedUsername,
      password: incorrectPassword,
      testCase: 'Login with incorrect password'
    };
    saveTestData(testData, 'json');
    saveTestData(testData, 'csv');

    cy.wait(5000);
  });

  it('Should not allow login with an empty username and password', () => {
    visitLoginPage();
    cy.get('button').contains('Sign In Now').click();
    cy.contains('The username field is empty.').should('be.visible');
    cy.contains('The password field is empty.').should('be.visible');

    // Save tested data for empty fields to JSON and CSV
    const testData = {
      username: '',
      password: '',
      testCase: 'Login with empty fields'
    };
    saveTestData(testData, 'json');
    saveTestData(testData, 'csv');
  });
});
