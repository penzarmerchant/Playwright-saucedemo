import { test, expect } from '../../fixtures/pomFixture';
import * as saucedemoData from '../TestData/sauceDemoCredentials.json'

test('Sauce Demo Purchase Product', async ({ page,loginPage,inventoryPage,cartPage,checkoutPage }) => {
    await page.goto('https://www.saucedemo.com/');

    
    await loginPage.enterUsername(saucedemoData.validUsername);
    await loginPage.enterPassword(saucedemoData.validPassword);
    await loginPage.clickLoginbutton();
    
    await inventoryPage.addBackpack();
    await inventoryPage.addBacklight();
    await inventoryPage.clickCartLogo();

    await cartPage.clickcheckoutButton();

   /* await checkoutPage.enterfirstName(" ");
    await checkoutPage.enterlastName(" ");
    await checkoutPage.enterpincode(" "); */

  
    await checkoutPage.clickcontinue();

})