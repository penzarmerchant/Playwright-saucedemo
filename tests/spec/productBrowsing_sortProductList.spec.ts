import { test, expect } from '@fixtures/pomFixture';
import * as saucedemoData from '@testData/sauceDemoCredentials.json';
import { allure } from 'allure-playwright';
import { Severity } from 'allure-js-commons';

test.beforeEach(async ({ page, loginPage }) => {
  await allure.feature('Product Browsing');
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

test('Verify product list post sorting with name ascending', async ({
  inventoryPage,
}) => {
  await allure.tags('Regression');
  await allure.severity(Severity.CRITICAL);
  var productName;
  await allure.step('Fetch initial product names', async () => {
    productName = await inventoryPage.getAllProductItemName();
  });

  await allure.step(
    'Verify that product names are sorted in ascending order',
    async () => {
      const sortedName = [...productName].sort((a, b) => a.localeCompare(b));
      expect(productName).toEqual(sortedName);
    },
  );

  await allure.step(
    'Sort by Name (A to Z) and verify the ascending order',
    async () => {
      await inventoryPage.sortProducts('Name (Z to A)');
      await inventoryPage.sortProducts('Name (A to Z)');
      const productName1 = await inventoryPage.getAllProductItemName();
      const sortedName1 = [...productName1].sort((a, b) => a.localeCompare(b));
      expect(productName1).toEqual(sortedName1);
    },
  );
});

test('Verify product list post sorting with name descending', async ({
  inventoryPage,
}) => {
  await allure.tags('Regression');
  await allure.severity(Severity.CRITICAL);
  await allure.step('Sorting the product name in desending order', async () => {
    await inventoryPage.sortProducts('Name (Z to A)');
  });
  await allure.step(
    'Verifying Sorted  Product Name are in desending order',
    async () => {
      const productName = await inventoryPage.getAllProductItemName();
      const sortedName = [...productName].sort((a, b) => b.localeCompare(a));
      expect(productName).toEqual(sortedName);
    },
  );
});

test('Verify product list post sorting with price low to high', async ({
  inventoryPage,
}) => {
  await allure.tags('Regression');
  await allure.severity(Severity.NORMAL);
  var productPrice;

  await allure.step('Sort the products by price (low to high)', async () => {
    await inventoryPage.sortProducts('Price (low to high)');
  });

  await allure.step('Retrieve the list of all product prices', async () => {
    productPrice = await inventoryPage.getAllProductItemPrice();
  });

  await allure.step(
    'Compare the original product prices with the sorted prices.',
    async () => {
      const sortedPrice = [...productPrice].sort((a, b) => a - b);
      expect(productPrice).toEqual(sortedPrice);
    },
  );
});

test('Verify product list post sorting with price high to low', async ({
  inventoryPage,
}) => {
  await allure.tags('Sanity');
  await allure.severity(Severity.CRITICAL);
  var productPrice;
  var sortedPrice;

  await allure.step('Sort the products by price (high to low)', async () => {
    await inventoryPage.sortProducts('Price (high to low)');
  });

  await allure.step('Retrieve the list of all product prices', async () => {
    productPrice = await inventoryPage.getAllProductItemPrice();
  });
  await allure.step('Sorting the prices in desending order.', async () => {
    sortedPrice = [...productPrice].sort((a, b) => b - a);
  });
  await allure.step(
    'Compare the original product prices with the sorted prices.',
    async () => {
      expect(productPrice).toEqual(sortedPrice);
    },
  );
});
