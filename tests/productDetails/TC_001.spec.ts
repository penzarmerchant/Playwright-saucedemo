import { test, expect } from '../../fixtures/pomFixture';
import * as saucedemoData from '../TestData/sauceDemoCredentials.json'

test('View Purchase Product List', async ({ page,loginPage,inventoryPage}) => {
    await page.goto('https://www.saucedemo.com/');
    await loginPage.enterUsername(saucedemoData.validUsername);
    await loginPage.enterPassword(saucedemoData.validPassword);
    await page.waitForTimeout(1000);
    await loginPage.clickLoginbutton();

    await inventoryPage.clickbackpackImage();
    await page.waitForTimeout(1000);

    const confirmMessage=await page.locator('[data-test="inventory-item-name"]');
    expect(confirmMessage).toHaveText("Sauce Labs Backpack");

    //const confirmationMessage = await page.locator('.complete-header').textContent();
    //expect(confirmationMessage).toContain('Thank you for your order!');

})