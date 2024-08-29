import { test, expect } from '@fixtures/pomFixture'
import * as saucedemoData from '@testData/sauceDemoCredentials.json'

const aboutUrl='https://saucelabs.com/';

test.beforeEach(async ({ page, loginPage }) => {
    await page.goto('/');
    await loginPage.loginUser(saucedemoData.validUsername, saucedemoData.validPassword);
});

test('Sidepanel all items navigation', async ({ inventoryPage,cartPage,commonPage}) => {
    await inventoryPage.addBackpack();
    await inventoryPage.addBacklight();
    await inventoryPage.clickCartLogo();
    await cartPage.clickcheckoutButton();
    await commonPage.clickHamburgerIcon();
    await commonPage.clickAllitems();
    expect(await inventoryPage.isSortButtonVisible()).toBeTruthy();
});

test('Sidepanel about button navigation', async ({page,commonPage}) => {
    await commonPage.clickHamburgerIcon();
    await commonPage.clickAbout();
    await expect(page).toHaveURL(aboutUrl);
});

test('Sidepanel logout button navigation', async ({loginPage,commonPage}) => {
    await commonPage.clickHamburgerIcon();
    await commonPage.clickLogout();
    expect(await loginPage.isLoginButtonVisible()).toBeTruthy();
});
