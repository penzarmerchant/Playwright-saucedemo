import { test as baseTest } from '@playwright/test'
import { LoginPage } from '@pages/loginPage';
import { InventoryPage } from '@pages/inventoryPage';
import { CheckoutPage } from '@pages/checkoutPage';
import { CartPage } from '@pages/cartPage';
import { OverviewPage } from '@pages/overviewPage';
import { OrderConfirmationPage } from '@pages/orderConfirmationPage';
import { CommonPage } from '@pages/commonPage';

type pages = {
    loginPage: LoginPage,
    inventoryPage: InventoryPage,
    checkoutPage: CheckoutPage,
    cartPage: CartPage,
    overviewPage: OverviewPage,
    orderConfirmationPage: OrderConfirmationPage
    commonPage: CommonPage
}
const testPages = baseTest.extend<pages>({
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },
    inventoryPage: async ({ page }, use) => {
        await use(new InventoryPage(page));
    },
    checkoutPage: async ({ page }, use) => {
        await use(new CheckoutPage(page));
    },
    cartPage: async ({ page }, use) => {
        await use(new CartPage(page));
    },
    overviewPage: async ({ page }, use) => {
        await use(new OverviewPage(page));
    },
    orderConfirmationPage: async ({ page }, use) => {
        await use(new OrderConfirmationPage(page));
    },

    commonPage: async ({ page }, use) => {
        await use(new CommonPage(page));
    },
})

export const test = testPages;
export const expect = testPages.expect;