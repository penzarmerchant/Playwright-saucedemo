import { test, expect } from '../../fixtures/pomFixture';
import * as saucedemoData from '../TestData/sauceDemoCredentials.json'

    test('Login with invalid Credentials', async ({ page,loginPage}) => {
    await page.goto('https://www.saucedemo.com/');
    await loginPage.enterUsername(saucedemoData.invalidUsername);
    await loginPage.enterPassword(saucedemoData.invalidPassword);
    await loginPage.clickLoginbutton();
    await expect(page.locator('//h3[contains(text(),"Epic sadface: Username and password do not match any user in this service")]')).toHaveText('Epic sadface: Username and password do not match any user in this service');
    await page.pause();
})