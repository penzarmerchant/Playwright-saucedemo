import { test, expect } from '@fixtures/pomFixture';
import * as saucedemoData from '@testData/sauceDemoCredentials.json';
import { allure } from 'allure-playwright';
import { Severity } from 'allure-js-commons';

const aboutUrl = 'https://saucelabs.com/';

test.beforeEach(async ({ page, loginPage }) => {
  await allure.step('Navigating to the Login page', async () => {
    await page.goto('/');
  });
  await allure.step('Login with valid credentials', async () => {
    await loginPage.loginUser(
      saucedemoData.validUsername,
      saucedemoData.validPassword);});
});

test('Verify navigating to all items page via sidepanel', async ({
  inventoryPage,
  cartPage,
  commonPage,
}) => {
  await allure.tags('smoke');
  await allure.severity(Severity.CRITICAL);
  await allure.step('Adding items to cart', async () => {
  await inventoryPage.addBackpack();
  await inventoryPage.addBacklight();
  });
  await allure.step('Checking out items', async () => {
  await inventoryPage.clickCartLogo();
  await cartPage.clickcheckoutButton();
  });

  await allure.step('Navigating back to Inventory Page', async () => {
  await commonPage.clickHamburgerIcon();
  await commonPage.clickAllitems();
  });

  await allure.step('Asserting is Sort button visible in Inventory page',async () => {
      expect(await inventoryPage.isSortButtonVisible()).toBeTruthy();
    });
});

test('Verify navigating to about page via sidepanel', async ({
  page,
  commonPage,
}) => {
  await allure.tags('sanity');
  await allure.severity(Severity.MINOR);
  await allure.step('Navigating to About page', async () => {
  await commonPage.clickHamburgerIcon();
  await commonPage.clickAbout();
  });
  await allure.step('Asserting About page URL', async () => {
  await expect(page).toHaveURL(aboutUrl);
  });
});

test('Verify navigating to login page through logout via sidepanel', async ({
  loginPage,
  commonPage,
}) => {
  await allure.tags('regression');
  await allure.severity(Severity.NORMAL);
  await allure.step('Logging Out the user', async () => {
  await commonPage.clickHamburgerIcon();
  await commonPage.clickLogout();
  });
  await allure.step('Asserting if the login button is visible in the login page',async () => {
    expect(await loginPage.isLoginButtonVisible()).toBeTruthy();
    });
});
