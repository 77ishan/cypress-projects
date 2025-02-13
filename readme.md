User Registration & Login Test with Cypress

This project automates the user registration and login functionality for the website Receive-SMSS using Cypress.

📌 Features

    • Automated user registration with random credentials. 
    • Login test using registered credentials. 
    • Data persistence via fixture files (userData.json). 
    • Validation checks for incorrect and empty credentials. 

🚀 Running Tests

1️⃣ Run the Registration Test
This generates random user credentials and saves them in cypress/fixtures/userData.json.

npx cypress run --spec cypress/e2e/register.cy.js

2️⃣ Run the Login Test
This retrieves credentials from userData.json and logs in.

npx cypress run --spec cypress/e2e/login.cy.js

3️⃣ Run Tests in Cypress UI
npx cypress open


⚙️ Cypress Environment Variables

You can configure environment variables in

cypress.config.js


module.exports = {
  
  e2e: {
    
    baseUrl: 'https://receive-smss.com',
    env: {
    firstName: 'Ishan',
      lastName: 'Rai'
    }
  }
};



Happy Testing! 🚀
