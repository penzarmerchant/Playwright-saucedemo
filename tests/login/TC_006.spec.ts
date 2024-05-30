import { test, expect } from '../../fixtures/pomFixture';
import * as saucedemoData from '../TestData/sauceDemoCredentials.json'

    test('Login with valid credentails', async ({ page,loginPage}) => {
    await page.goto('https://www.saucedemo.com/');
    await loginPage.enterUsername(saucedemoData.validUsername);
    await page.waitForTimeout(2000);
    await loginPage.enterPassword(saucedemoData.validPassword);
    await page.waitForTimeout(2000);
    await loginPage.clickLoginbutton();
})