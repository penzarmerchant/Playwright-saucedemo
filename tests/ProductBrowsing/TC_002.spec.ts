import { test, expect } from '../../fixtures/pomFixture';
import * as saucedemoData from '../TestData/sauceDemoCredentials.json'

    test('Sort Purchase Product', async ({ page,loginPage}) => {
    await page.goto('https://www.saucedemo.com/');
    await loginPage.enterUsername(saucedemoData.validUsername);
    await loginPage.enterPassword(saucedemoData.validPassword);
    await page.waitForTimeout(2000);
    await loginPage.clickLoginbutton();
    
    await page.waitForTimeout(1000);
    await page.selectOption('//select[@class="product_sort_container"]',{
        //value:"lohi",
       // index:0,
        //label:"Name (Z to A)",
        index:3
    });
    await page.waitForTimeout(2000);
})