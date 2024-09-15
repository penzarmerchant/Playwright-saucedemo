import { test, expect } from '@fixtures/pomFixture';
import * as saucedemoData from '@testData/sauceDemoCredentials.json';
import { allure } from 'allure-playwright';
import { Severity } from 'allure-js-commons';

const invalidCredentialError =
  'Epic sadface: Username and password do not match any user in this service';
const usernameBlankError = 'Epic sadface: Username is required';
const passwordBlankError = 'Epic sadface: Password is required';

test.beforeEach(async ({ page }) => {
  await allure.feature('Login')
  await allure.step('Navigating to the Login page', async () => {
    await page.goto('/');
  });
});

test('Verify successful login with valid credentails', async ({
  loginPage,
  inventoryPage,
}) => {
  await allure.tags('smoke');
  await allure.severity(Severity.CRITICAL);
  await allure.step(
    'Enter valid credentials for username & password field',
    async () => {
      await loginPage.loginUser(
        saucedemoData.validUsername,
        saucedemoData.validPassword,
      );
    },
  );
  await allure.step(
    'Asserting is Sort button visible in Inventory page',
    async () => {
      expect(await inventoryPage.isSortButtonVisible()).toBeTruthy();
    },
  );
});

test('Verify unsuccessful login with invalid username and password', async ({
  loginPage,
}) => {
  await allure.tags('Smoke');
  await allure.severity(Severity.CRITICAL);
  await allure.step(
    'Enter invalid credentials for username & password field',
    async () => {
      await loginPage.loginUser(
        saucedemoData.invalidUsername,
        saucedemoData.invalidPassword,
      );
    },
  );
  await allure.step(
    'Asserting if the error appears',
    async () => {
      expect(await loginPage.getErrorMessage()).toEqual(invalidCredentialError);
    },
  );
});

test('Verify unsuccessful login with invalid username', async ({
  loginPage,
}) => {
  await allure.tags('Regression');
  await allure.severity(Severity.CRITICAL);
  await allure.step(
    'Enter a invalid username but an valid password',
    async () => {
      await loginPage.loginUser(
        saucedemoData.invalidUsername,
        saucedemoData.validPassword,
      );
    },
  );
  await allure.step(
    'Asserting if the error appears',
    async () => {
      expect(await loginPage.getErrorMessage()).toEqual(invalidCredentialError);
    },
  );
});

test('Verify unsuccessful login with invalid password', async ({
  loginPage,
}) => {
  await allure.tags('Regression');
  await allure.severity(Severity.NORMAL);
  await allure.step(
    'Enter a valid username but an invalid password',
    async () => {
      await loginPage.loginUser(
        saucedemoData.validUsername,
        saucedemoData.invalidPassword,
      );
    },
  );
  await allure.step(
    'Asserting if the error appears',
    async () => {
      expect(await loginPage.getErrorMessage()).toEqual(invalidCredentialError);
    },
  );
});

test('Verify unsuccessful login with blank username and password', async ({
  loginPage,
}) => {
  await allure.tags('Regression');
  await allure.severity(Severity.CRITICAL);
  await allure.step(
    'User attempts to log in without entering a username and password,',
    async () => {
      await loginPage.loginUser(
        saucedemoData.blankUsername,
        saucedemoData.blankPassword,
      );
    },
  );
  await allure.step(
    'Asserting if the error appears',
    async () => {
      expect(await loginPage.getErrorMessage()).toEqual(usernameBlankError);
    },
  );
});

test('Verify unsuccessful login with blank username', async ({ loginPage }) => {
  await allure.tags('Regression');
  await allure.severity(Severity.CRITICAL);
  await allure.step('Enter a blank username and a valid password',
    async () => {
      await loginPage.loginUser(
        saucedemoData.blankUsername,
        saucedemoData.validPassword)
      })
  await allure.step('Asserting if the error appears',
    async () => {
      expect(await loginPage.getErrorMessage()).toEqual(usernameBlankError);
    });
});

test('Verify unsuccessful login with blank password', async ({ loginPage }) => {
  await allure.tags('Regression');
  await allure.severity(Severity.NORMAL);
  await allure.step('Enter a blank password and a valid username',
    async () => {
      await loginPage.loginUser(
        saucedemoData.validUsername,
        saucedemoData.blankPassword);
    });
  await allure.step('Asserting if the error appears',
    async () => {
      expect(await loginPage.getErrorMessage()).toEqual(passwordBlankError);
    });
});
