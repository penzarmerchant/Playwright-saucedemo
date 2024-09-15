import { test, expect } from '@fixtures/pomFixture';
import * as saucedemoData from '@testData/sauceDemoCredentials.json';
import { allure } from 'allure-playwright';
import { Severity } from 'allure-js-commons';

const successMessage = 'Thank you for your order!';
const errorMessage = 'Error: First Name is required';

test.beforeEach(async ({ page, loginPage }) => {
  await allure.feature('Cart')
  await allure.step('Navigating to the Login page', async () => {
    await page.goto('/');
  });
  await allure.step('Login with valid credentials', async () => {
    await loginPage.loginUser(
      saucedemoData.validUsername,
      saucedemoData.validPassword,
    );
  });
});

test('Verify Successful Product Placement', async ({
  inventoryPage,
  cartPage,
  checkoutPage,
  overviewPage,
  orderConfirmationPage,
  commonPage,
}) => {
  await allure.tags('smoke');
  await allure.severity(Severity.CRITICAL);
 

  await allure.step('Adding items to cart', async () => {
    await inventoryPage.addBackpack();
    await inventoryPage.addBacklight();
  });
  await allure.step('Removing items from Cart', async () => {
    await inventoryPage.clickCartLogo();
    await cartPage.removeItembackpack();
  });
  await allure.step('Checking out items', async () => {
    await cartPage.clickcheckoutButton();
    await checkoutPage.completeCheckout(
      saucedemoData.firstName,
      saucedemoData.lastName,
      saucedemoData.pinCode,
    );
    await overviewPage.clickonfinish();
  });
  await allure.step(
    'Asserting success message after complete order',
    async () => {
      expect(await orderConfirmationPage.getSuccessMessage()).toEqual(
        successMessage,
      );
    },
  );
  await allure.step('User Logout', async () => {
    await commonPage.userLogout();
  });
});

test('Verify that user cannot proceed to checkout with incomplete user details', async ({
  inventoryPage,
  cartPage,
  checkoutPage,
}) => {
  await allure.tags('Sanity');
  await allure.severity(Severity.NORMAL);

  await allure.step('Adding items to cart', async () => {
    await inventoryPage.addBackpack();
    await inventoryPage.addBacklight();
  });

  await allure.step('Proceeding to checkout', async () => {
    await inventoryPage.clickCartLogo();
    await cartPage.clickcheckoutButton();
  });

  await allure.step(
    'Attempting to continue without entering details',
    async () => {
      await checkoutPage.clickcontinue();
    },
  );

  await allure.step('Asserting the error message is displayed', async () => {
    expect(await checkoutPage.getErrorMessageText()).toEqual(errorMessage);
  });
});

test('Verify the cart count', async ({ inventoryPage, commonPage }) => {
  await allure.tags('Regression');
  await allure.severity(Severity.CRITICAL);

  await allure.step('Adding items to cart', async () => {
    await inventoryPage.addBackpack();
    await inventoryPage.addBacklight();
  });
  await allure.step('Asserting Cart count values', async () => {
    expect(await commonPage.cartCountValues()).toEqual(2);
  });
  await allure.step('Removing items from cart', async () => {
    await inventoryPage.removeItembackpack();
  });
  await allure.step('Asserting Cart count values', async () => {
    expect(await commonPage.cartCountValues()).toEqual(1);
  });
});

test('Verify the product count on the cart page and cart logo', async ({
  inventoryPage,
  cartPage,
  commonPage,
}) => {
  await allure.tags('Sanity');
  await allure.severity(Severity.CRITICAL);

  await allure.step('Adding items to the cart', async () => {
    await inventoryPage.addBackpack();
    await inventoryPage.addBacklight();
    await inventoryPage.addtshirt();
    await inventoryPage.addFleeceJacket();
  });
  await allure.step('Removing an item from the cart', async () => {
    await inventoryPage.clickCartLogo();
    await cartPage.removeItembackpack();
  });
  await allure.step('Asserting item count on the cart page', async () => {
    expect(await cartPage.allItemNameCount()).toEqual(3);
  });
  await allure.step('Asserting item count on the cart logo', async () => {
    expect(await commonPage.cartCountValues()).toEqual(3);
  });
});

test('Verify the total price in cart page', async ({
  inventoryPage,
  cartPage,
  checkoutPage,
}) => {
  await allure.tags('smoke');
  await allure.severity(Severity.CRITICAL);

  await allure.step('Adding items to cart', async () => {
    await inventoryPage.addBackpack();
    await inventoryPage.addBacklight();
    await inventoryPage.addFleeceJacket();
    await inventoryPage.addtshirt();
  });
  await allure.step('Checking out items', async () => {
    await inventoryPage.clickCartLogo();
    await cartPage.clickcheckoutButton();
    await checkoutPage.completeCheckout(
      saucedemoData.firstName,
      saucedemoData.lastName,
      saucedemoData.pinCode,
    );
  });
  await allure.step('Comparing & Asserting Total Item Price', async () => {
    const totalprice = await checkoutPage.getTotalPriceText();
    const allproductprice = await checkoutPage.getAllProductPriceListTotal();
    expect(allproductprice).toEqual(totalprice);
  });
});

test('Accessing SauceLabs in new tab', async ({ page, inventoryPage }) => {
  await allure.tags('Regression');
  await allure.severity(Severity.NORMAL);
  var newTab;
  await allure.step('Adding items to cart', async () => {
    await inventoryPage.addBackpack();
    await inventoryPage.addBacklight();
    await inventoryPage.clickCartLogo();
  });
  await allure.step('Opening saucelabs in a new tab ', async () => {
    newTab = await page.context().newPage();
    await newTab.goto('/');
  });
  await allure.step('Login in New Tab', async () => {
    await newTab.fill('#user-name', saucedemoData.validUsername);
    await newTab.fill('#password', saucedemoData.validPassword);
    await newTab.click('#login-button');
  });
  await allure.step('Navigating to the cart page in new tab', async () => {
    await newTab.waitForLoadState('load');
    await newTab.click('.shopping_cart_link');
  });
  await allure.step('Verifying the title of the new tab', async () => {
    await expect(page).toHaveTitle('Swag Labs');
    await newTab.close();
  });
});
