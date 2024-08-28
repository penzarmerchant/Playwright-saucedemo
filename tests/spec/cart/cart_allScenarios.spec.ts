import { test, expect } from '@fixtures/pomFixture'
import * as saucedemoData from '@testData/sauceDemoCredentials.json'

const successMessage = 'Thank you for your order!';
const errorMessage = 'Error: First Name is required';

test.beforeEach(async ({ page, loginPage, sidePanelPage }) => {
    await page.goto('/');
    await loginPage.loginUser(saucedemoData.validUsername, saucedemoData.validPassword);
});

test('Sauce Demo Purchase Product', async ({ page, loginPage, inventoryPage, cartPage, checkoutPage, overviewPage, orderConfirmationPage, sidePanePage }) => {
    await inventoryPage.addBackpack();
    await inventoryPage.addBacklight();
    await inventoryPage.clickCartLogo();
    await cartPage.removeItembackpack();
    await cartPage.clickcheckoutButton();
    await checkoutPage.completeCheckout(saucedemoData.firstName, saucedemoData.lastName, saucedemoData.pinCode);
    await overviewPage.clickonfinish();
    expect(await orderConfirmationPage.getSuccessMessage()).toEqual(successMessage);
    await sidePanePage.userLogout();
});

test('Sauce Demo Purchase Product with blank user details', async ({ page, loginPage, inventoryPage, cartPage, checkoutPage, overviewPage }) => {
    await inventoryPage.addBackpack();
    await inventoryPage.addBacklight();
    await inventoryPage.clickCartLogo();
    await cartPage.clickcheckoutButton();
    await checkoutPage.clickcontinue();
    expect(await checkoutPage.getErrorMessageText()).toEqual(errorMessage);
});

test('Sauce Demo- Count of the Cart Items', async ({ page, loginPage, inventoryPage, cartPage, checkoutPage, overviewPage }) => {
    await inventoryPage.addBackpack();
    await inventoryPage.addBacklight();
    expect(await inventoryPage.cartCountValues()).toEqual(2);
    await inventoryPage.removeItembackpack();
    expect(await inventoryPage.cartCountValues()).toEqual(1);
});

test('Sauce Demo- Remove items from cart page', async ({ page, loginPage, inventoryPage, cartPage, checkoutPage, overviewPage }) => {
    await inventoryPage.addBackpack();
    await inventoryPage.addBacklight();
    await inventoryPage.addtshirt();
    await inventoryPage.addFleeceJacket();
    await inventoryPage.clickCartLogo();
    await cartPage.removeItembackpack();
    expect(await cartPage.allItemNameCount()).toEqual(3);
    expect(await inventoryPage.cartCountValues()).toEqual(3);
});

test('Sauce Demo-Total of All Items', async ({ page, loginPage, inventoryPage, cartPage, checkoutPage, overviewPage, orderConfirmationPage, sidePanePage }) => {
    await inventoryPage.addBackpack();
    await inventoryPage.addBacklight();
    await inventoryPage.addFleeceJacket();
    await inventoryPage.addtshirt();
    await inventoryPage.clickCartLogo();
    await cartPage.clickcheckoutButton();
    await checkoutPage.completeCheckout(saucedemoData.firstName, saucedemoData.lastName, saucedemoData.pinCode);
    const totalprice = await checkoutPage.getTotalPriceText();
    const allproductprice = await checkoutPage.getAllProductPriceListTotal();
    expect(allproductprice).toEqual(totalprice);
});