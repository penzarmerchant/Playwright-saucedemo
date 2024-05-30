import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/loginpage';
import { inventoryPage } from './pages/inventoryPage';
import { checkoutPage } from './pages/checkoutPage';
import { cartPage } from './pages/cartpage';
import { overviewPage } from './pages/overviewPage';



    test('Sauce Demo Purchase Product', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');

    const lp=new LoginPage(page);
    const ip=new inventoryPage(page);
    const cp=new cartPage(page);
    const cop=new checkoutPage(page);
    const op=new overviewPage(page);

    await lp.enterUsername("standard_user");
    await lp.enterPassword("secret_sauce");
    await lp.clickLoginbutton();
    
    await ip.addBackpack();
    await ip.addBacklight();
    await ip.clickCartLogo();

    await cp.clickcheckoutButton();

    await cop.enterfirstName("Penzar");
    await cop.enterlastName("Merchant");
    await cop.enterpincode("400101");
    await cop.clickcontinue();

    await op.clickonfinish();
    

})