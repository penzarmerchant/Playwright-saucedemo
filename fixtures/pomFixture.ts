import {test as baseTest} from '@playwright/test'

import { LoginPage } from '../pages/loginpage';

import { inventoryPage } from '../pages/inventoryPage';

import { checkoutPage } from '../pages/checkoutPage';

import { cartPage } from '../pages/cartpage';

import { overviewPage } from '../pages/overviewPage';

type pages = {
    loginPage:LoginPage,
    inventoryPage:inventoryPage,
    checkoutPage:checkoutPage,
    cartPage:cartPage,
    overviewPage:overviewPage
}
const testPages = baseTest.extend<pages>({
    loginPage: async({page}, use) =>{
        await use(new LoginPage(page));
    },
    inventoryPage: async({page}, use) =>{
        await use(new inventoryPage(page));
    },
    checkoutPage: async({page}, use) =>{
        await use(new checkoutPage(page));
    },
    cartPage: async({page}, use) =>{
        await use(new cartPage(page));
    },
    overviewPage: async({page}, use) =>{
        await use(new overviewPage(page));
    },
})

export const test = testPages;
export const expect = testPages.expect;