import { test, expect } from '../../fixtures/pomFixture';
import * as saucedemoData from '../TestData/sauceDemoCredentials.json'

    test('Login with valid username', async ({ page,loginPage}) => {
    await page.goto('https://www.saucedemo.com/');
    await loginPage.enterUsername(saucedemoData.validUsername);
    await loginPage.enterPassword(saucedemoData.invalidPassword);
    await loginPage.clickLoginbutton();
})