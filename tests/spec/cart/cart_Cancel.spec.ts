
import {test,expect} from '@fixtures/pomFixture'
import * as saucedemoData from '@testData/sauceDemoCredentials.json'

test('Sauce Demo Purchase Product-Cancel', async ({ page, loginPage, inventoryPage, cartPage, checkoutPage, overviewPage }) => {
    test.slow();
    await page.goto('/');

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
  
   await checkoutPage.clickcontinue();
   expect(await checkoutPage.getErrorMessageText()).toEqual('Error: First Name is required');
   
   

})