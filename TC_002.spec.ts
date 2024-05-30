import {test,expect} from '../../fixtures/pomFixture'
import * as saucedemoData from '../TestData/sauceDemoCredentials.json'

test('Sauce Demo Purchase Product-Remove item from Cart', async ({ page,loginPage,inventoryPage,checkoutPage,cartPage,overviewPage }) => {
    
    await page.goto('https://www.saucedemo.com/');
    
    await loginPage.enterUsername(saucedemoData.validUsername);
    await loginPage.enterPassword(saucedemoData.validPassword);
    await loginPage.clickLoginbutton();

    
    await inventoryPage.addBackpack();
    


    await inventoryPage.addBacklight();

    await inventoryPage.clickCartLogo();

    await inventoryPage.removeItembackpack();

    await cartPage.clickcheckoutButton();

    await checkoutPage.enterfirstName('Penzar');
    await checkoutPage.enterlastName('Merchant');
    await checkoutPage.enterpincode('400101');
    await checkoutPage.clickcontinue();
 
    await overviewPage.clickonfinish();

})