import {test,expect} from '../../fixtures/pomFixture'
import * as saucedemoData from '../TestData/sauceDemoCredentials.json'

test('Sauce Demo Purchase Product-Cancel', async ({ page, loginPage, inventoryPage, cartPage, checkoutPage, overviewPage }) => {
    await page.goto('https://www.saucedemo.com/');

    await loginPage.enterUsername(saucedemoData.validUsername);
    await loginPage.enterPassword(saucedemoData.validPassword);
    await loginPage.clickLoginbutton();

    await inventoryPage.addBackpack();
    await inventoryPage.addBacklight();

    await inventoryPage.clickCartLogo();

    await cartPage.clickcheckoutButton();

   /* await checkoutPage.enterfirstName('Penzar');
    await checkoutPage.enterlastName('Merchant');
    await checkoutPage.enterpincode('400101');*/

    await checkoutPage.clickCancel();

})