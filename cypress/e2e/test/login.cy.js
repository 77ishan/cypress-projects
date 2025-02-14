import LoginPage from '../pages/loginPage'

describe('User Login Test', () => {
    let userData;
    const loginPage = new LoginPage();
  
    before(() => {
      
      cy.fixture('userData').then((data) => {
        userData = data;
      });
    });
  
    it('Should log in with registered user credentials', () => {
      loginPage.visit();
      loginPage.fillLoginInfo(userData.username, userData.password);
      loginPage.clickSignInButton();
      loginPage.assertLogoutButtonVisible(); 
      cy.get('button').contains('Logout').click();
      loginPage.assertLoginButtonVisible(); 
    });
   


    it('Should not allow login with empty credentials', () => {
        loginPage.visit();
        loginPage.clickSignInButton();
        loginPage.assertionEmptyFields(); 
    });

    it('Should not allow login with an unregistered user', () => {
      const username = 'nonexistentUser';
      const password = 'randomPassword123';
  
      loginPage.visit();
      loginPage.fillLoginInfo(username, password);
      loginPage.clickSignInButton();
    
      const errorMessage = `${username} is not registered on this site. If you are unsure of your username, try your email address instead.`;
      
      
      loginPage.assertErrorMessageVisible(errorMessage); 
      loginPage.assertLoginButtonVisible();
    });
      
  });
  
