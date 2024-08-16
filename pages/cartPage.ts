import { Page, Locator } from '@playwright/test';
import BasePage from './basepage';



export class cartPage extends BasePage{

   readonly checkoutButton: Locator;


    constructor(page: Page) {
        super(page)
        this.checkoutButton = page.locator('#checkout');
       
      }
    
      // Method to operate the Locators
      async clickcheckoutButton() {
        await this.clickelement(this.checkoutButton);
      }
}
