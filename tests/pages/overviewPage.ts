import { Page, Locator } from '@playwright/test';
import BasePage from './basepage';

export class OverviewPage extends BasePage {

  private readonly finishButton: Locator;
  constructor(page: Page) {
    super(page)
    this.finishButton = page.locator('#finish');
  }
  // Method to operate the Locators
  async clickonfinish() {
    await this.clickelement(this.finishButton);
  }
}