import { test, expect } from '@fixtures/pomFixture';
import * as saucedemoData from '@testData/sauceDemoCredentials.json';

const successMessage = 'Thank you for your order!';
const errorMessage = 'Error: First Name is required';

test.beforeEach(async ({ page, loginPage }) => {
  await page.goto('/');
  await loginPage.loginUser(
    saucedemoData.validUsername,
    saucedemoData.validPassword,
  );
});

test('Verify Successful Product Placement', async ({
  inventoryPage,
  cartPage,
  checkoutPage,
  overviewPage,
  orderConfirmationPage,
  commonPage,
}) => {
  await inventoryPage.addBackpack();
  await inventoryPage.addBacklight();
  await inventoryPage.clickCartLogo();
  await cartPage.removeItembackpack();
  await cartPage.clickcheckoutButton();
  await checkoutPage.completeCheckout(
    saucedemoData.firstName,
    saucedemoData.lastName,
    saucedemoData.pinCode,
  );
  await overviewPage.clickonfinish();
  expect(await orderConfirmationPage.getSuccessMessage()).toEqual(
    successMessage,
  );
  await commonPage.userLogout();
});

test('Verify that user cannot proceed to checkout with incomplete Details user details', async ({
  inventoryPage,
  cartPage,
  checkoutPage,
}) => {
  await inventoryPage.addBackpack();
  await inventoryPage.addBacklight();
  await inventoryPage.clickCartLogo();
  await cartPage.clickcheckoutButton();
  await checkoutPage.clickcontinue();
  expect(await checkoutPage.getErrorMessageText()).toEqual(errorMessage);
});

test('Verify the cart count', async ({ inventoryPage, commonPage }) => {
  await inventoryPage.addBackpack();
  await inventoryPage.addBacklight();
  expect(await commonPage.cartCountValues()).toEqual(2);
  await inventoryPage.removeItembackpack();
  expect(await commonPage.cartCountValues()).toEqual(1);
});

test('Verify the product count in the cart page', async ({
  inventoryPage,
  cartPage,
  commonPage,
}) => {
  await inventoryPage.addBackpack();
  await inventoryPage.addBacklight();
  await inventoryPage.addtshirt();
  await inventoryPage.addFleeceJacket();
  await inventoryPage.clickCartLogo();
  await cartPage.removeItembackpack();
  expect(await cartPage.allItemNameCount()).toEqual(3);
  expect(await commonPage.cartCountValues()).toEqual(3);
});

test('Verify the total price in cart page', async ({
  inventoryPage,
  cartPage,
  checkoutPage,
}) => {
  await inventoryPage.addBackpack();
  await inventoryPage.addBacklight();
  await inventoryPage.addFleeceJacket();
  await inventoryPage.addtshirt();
  await inventoryPage.clickCartLogo();
  await cartPage.clickcheckoutButton();
  await checkoutPage.completeCheckout(
    saucedemoData.firstName,
    saucedemoData.lastName,
    saucedemoData.pinCode,
  );
  const totalprice = await checkoutPage.getTotalPriceText();
  const allproductprice = await checkoutPage.getAllProductPriceListTotal();
  expect(allproductprice).toEqual(totalprice);
});

test('Accessing SauceLabs in new tab', async ({
  page,
  loginPage,
  inventoryPage,
}) => {
  await page.goto('/');
  await loginPage.loginUser(
    saucedemoData.validUsername,
    saucedemoData.validPassword,
  );
  await inventoryPage.addBackpack();
  await inventoryPage.addBacklight();
  await inventoryPage.clickCartLogo();
  const newTab = await page.context().newPage();
  await newTab.goto('/');
  // Log in again in the new tab
  await newTab.fill('#user-name', saucedemoData.validUsername);
  await newTab.fill('#password', saucedemoData.validPassword);
  await newTab.click('#login-button');
  await newTab.waitForLoadState('load');
  await newTab.click('.shopping_cart_link');
  await expect(page).toHaveTitle('Swag Labs');
  await newTab.waitForTimeout(2000);
  await newTab.close();
});
