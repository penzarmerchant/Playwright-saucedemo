import { Page, Locator } from '@playwright/test';
import BasePage from './basepage';

export class overviewPage extends BasePage {

  private readonly finishButton: Locator;
  constructor(page: Page) {
    super(page)
    this.finishButton = page.locator('//button[@id="finish"]');

  }

  // Method to operate the Locators
  async clickonfinish() {
    await this.clickelement(this.finishButton);
  }
}