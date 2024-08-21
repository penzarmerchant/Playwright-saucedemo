import {test,expect} from '@fixtures/pomFixture'
import * as saucedemoData from '@testData/sauceDemoCredentials.json'

    test('View Purchase Product List', async ({ page,loginPage}) => {
    await page.goto('/');
    await loginPage.enterUsername(saucedemoData.validUsername);
    await page.waitForTimeout(2000);
    await loginPage.enterPassword(saucedemoData.validPassword);
    await page.waitForTimeout(2000);
    await loginPage.clickLoginbutton();
    await expect(page).toHaveTitle('Swag Labs');
})