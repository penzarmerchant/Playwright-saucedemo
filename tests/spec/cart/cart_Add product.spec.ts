import {test,expect} from '@fixtures/pomFixture'
import * as saucedemoData from '@testData/sauceDemoCredentials.json'

test('Sauce Demo Purchase Product', async ({ page, loginPage, inventoryPage, cartPage, checkoutPage, overviewPage }) => {
    await page.goto('/');

    await loginPage.enterUsername(saucedemoData.validUsername);
    await loginPage.enterPassword(saucedemoData.validPassword);
    await loginPage.clickLoginbutton();

    await inventoryPage.addBackpack();
    await inventoryPage.addBacklight();
    await inventoryPage.clickCartLogo();

    await cartPage.clickcheckoutButton();

    await checkoutPage.enterfirstName('Penzar');
    await checkoutPage.enterlastName('Merchant');
    await checkoutPage.enterpincode('400101');
    await checkoutPage.clickcontinue();

    await overviewPage.clickonfinish();

    // Optionally, add assertions to verify the purchase
    const confirmationMessage = await page.locator('.complete-header').textContent();
    expect(confirmationMessage).toContain('Thank you for your order!');
});
