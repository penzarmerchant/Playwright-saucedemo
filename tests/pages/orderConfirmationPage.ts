import { Page, Locator } from '@playwright/test';
import BasePage from './basepage';

export class OrderConfirmationPage extends BasePage {

    private readonly successMessage: Locator;

    constructor(page: Page) { 
        super(page)
        this.successMessage = page.locator('.complete-header');
    }
    
    async getSuccessMessage():Promise<string>{
        return await this.getElementText(this.successMessage);
    }
}