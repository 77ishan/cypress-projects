const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://receive-smss.com',
    env: {
      firstName: 'Ishan',
      lastName: 'Rai',
      defaultPassword: 'TestPasswordA1@'
    }
  }
});
