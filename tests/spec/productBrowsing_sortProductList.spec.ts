import { test, expect } from '@fixtures/pomFixture'
import * as saucedemoData from '@testData/sauceDemoCredentials.json'

test.beforeEach(async ({ page, loginPage }) => {
    await page.goto('/');
    await loginPage.loginUser(saucedemoData.validUsername, saucedemoData.validPassword);
});

test('Verify product list post sorting with name ascending', async ({inventoryPage }) => {
    const productName = await inventoryPage.getAllProductItemName();
    const sortedName = [...productName].sort((a, b) => a.localeCompare(b));
    expect(productName).toEqual(sortedName);
    await inventoryPage.sortProducts('Name (Z to A)');
    await inventoryPage.sortProducts('Name (A to Z)');
    const productName1 = await inventoryPage.getAllProductItemName();
    const sortedName1 = [...productName1].sort((a, b) => a.localeCompare(b));
    expect(productName1).toEqual(sortedName1);
})

test('Verify product list post sorting with name descending', async ({inventoryPage }) => {
    await inventoryPage.sortProducts('Name (Z to A)');
    const productName = await inventoryPage.getAllProductItemName();
    const sortedName = [...productName].sort((a, b) => b.localeCompare(a));
    expect(productName).toEqual(sortedName);
})

test('Verify product list post sorting with price low to high', async ({inventoryPage }) => {
    await inventoryPage.sortProducts('Price (low to high)');
    const productPrice = await inventoryPage.getAllProductItemPrice();
    const sortedPrice = [...productPrice].sort((a, b) => a - b);
    expect(productPrice).toEqual(sortedPrice);
})

test('Verify product list post sorting with price high to low', async ({inventoryPage }) => {
    await inventoryPage.sortProducts('Price (high to low)');
    const productPrice = await inventoryPage.getAllProductItemPrice();
    const sortedPrice = [...productPrice].sort((a, b) => b - a);
    expect(productPrice).toEqual(sortedPrice);
})