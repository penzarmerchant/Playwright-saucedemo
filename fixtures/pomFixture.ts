import {test as baseTest} from '@playwright/test'

import { loginPage } from '../tests/pages/loginPage'

import { inventoryPage } from '../tests/pages/inventoryPage';

import { checkoutPage } from '../tests/pages/checkoutPage';

import { cartPage } from '../tests/pages/cartPage';

import { overviewPage } from '../tests/pages/overviewPage';

type pages = {
    loginPage:loginPage,
    inventoryPage:inventoryPage,
    checkoutPage:checkoutPage,
    cartPage:cartPage,
    overviewPage:overviewPage
}
const testPages = baseTest.extend<pages>({
    loginPage: async({page}, use) =>{
        await use(new loginPage(page));
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