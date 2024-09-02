import { test, expect } from '@fixtures/pomFixture';
import * as saucedemoData from '@testData/sauceDemoCredentials.json';

const aboutUrl = 'https://saucelabs.com/';

test.beforeEach(async ({ page, loginPage }) => {
  await page.goto('/');
  await loginPage.loginUser(
    saucedemoData.validUsername,
    saucedemoData.validPassword,
  );
});

test('Verify navigating to all items page via sidepanel', async ({
  inventoryPage,
  cartPage,
  commonPage,
}) => {
  await inventoryPage.addBackpack();
  await inventoryPage.addBacklight();
  await inventoryPage.clickCartLogo();
  await cartPage.clickcheckoutButton();
  await commonPage.clickHamburgerIcon();
  await commonPage.clickAllitems();
  expect(await inventoryPage.isSortButtonVisible()).toBeTruthy();
});

test('Verify navigating to about page via sidepanel', async ({
  page,
  commonPage,
}) => {
  await commonPage.clickHamburgerIcon();
  await commonPage.clickAbout();
  await expect(page).toHaveURL(aboutUrl);
});

test('Verify navigating to login page through logout via sidepanel', async ({
  loginPage,
  commonPage,
}) => {
  await commonPage.clickHamburgerIcon();
  await commonPage.clickLogout();
  expect(await loginPage.isLoginButtonVisible()).toBeTruthy();
});
