import { Page, Locator } from '@playwright/test';

export default class BasePage{

    readonly page: Page; // Global

    constructor(page: Page){ // Local
        this.page = page;
    }

    async navigateTo(url:string)
    {
        await this.page.goto(url);
    }

    async clickelement(element:Locator)
    {
        await element.click()
    }

    async fillField(element:Locator,text:string)
    {
        await element.fill(text);
    }

    async waitForElementVisible(selector:string){
        await this.page.waitForSelector(selector,{state:'visible'});
    }
}