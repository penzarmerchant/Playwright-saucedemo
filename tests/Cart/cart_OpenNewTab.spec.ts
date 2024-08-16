import {test,expect} from '../../fixtures/pomFixture'
import * as  saucedemoData from '../TestData/sauceDemoCredentials.json'

test('Open new Tab ', async ({ page, loginPage, inventoryPage, cartPage, checkoutPage, overviewPage }) => {
    await page.goto('https://www.saucedemo.com/');

    await loginPage.enterUsername(saucedemoData.validUsername);
    await loginPage.enterPassword(saucedemoData.validPassword);
    await loginPage.clickLoginbutton();

    await inventoryPage.addBackpack();
    await inventoryPage.addBacklight();

    await inventoryPage.clickCartLogo();

      // Wait for 2 seconds before opening a new tab
  await page.waitForTimeout(1500);

  // Open a new tab and navigate to the site
  const newTab = await page.context().newPage();
  await newTab.goto('https://www.saucedemo.com/');

  // Wait for 2 seconds before interacting with the new tab
  await newTab.waitForTimeout(1000);

  // Log in again in the new tab
  await newTab.fill('#user-name', saucedemoData.validUsername);
  await newTab.waitForTimeout(1000);
  await newTab.fill('#password', saucedemoData.validPassword);
  await newTab.click('#login-button');

  // Wait for the page to load
  await newTab.waitForLoadState('load');

  // Navigate to the cart in the new tab
  await newTab.click('.shopping_cart_link');
  await expect(page).toHaveTitle('Swag Labs');
  
  await newTab.waitForTimeout(2000);

  // Close the new tab
  await newTab.close();
    
})