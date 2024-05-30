import { test, expect } from '../../fixtures/pomFixture';
import * as saucedemoData from '../TestData/sauceDemoCredentials.json'

    test('Login with blank username and password', async ({ page,loginPage}) => {
    await page.goto('https://www.saucedemo.com/');
    await loginPage.enterUsername(saucedemoData.blankUsername);
    await page.waitForTimeout(2000);
    await loginPage.enterPassword(saucedemoData.blankPassword);
    await page.waitForTimeout(2000);
    await loginPage.clickLoginbutton();
})