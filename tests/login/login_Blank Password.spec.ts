import { test, expect } from '../../fixtures/pomFixture';
import * as saucedemoData from '../TestData/sauceDemoCredentials.json'

    test('Login with blank username', async ({ page,loginPage}) => {
    await page.goto('https://www.saucedemo.com/');
    await loginPage.enterUsername(saucedemoData.validUsername);
    await loginPage.enterPassword(saucedemoData.blankPassword);
    await loginPage.clickLoginbutton();
    await expect(page.locator('//h3[normalize-space()="Epic sadface: Password is required"]')).toHaveText('Epic sadface: Password is required');
    await page.pause();
})