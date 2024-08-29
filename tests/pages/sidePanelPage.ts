import { Page, Locator } from '@playwright/test';
import BasePage from './basepage';

export class SidePanelPage extends BasePage {

  private readonly hamburgerIcon: Locator;
  private readonly logoutButton: Locator;

  constructor(page: Page) {
    super(page)
    this.hamburgerIcon = page.locator('#react-burger-menu-btn');
    this.logoutButton = page.locator('#logout_sidebar_link');
  }

  async clickHamburgerIcon() {
    await this.clickelement(this.hamburgerIcon);
  }

  async clickLogutButton() {
    await this.clickelement(this.logoutButton);
  }

  async userLogout() {
    await this.clickHamburgerIcon();
    await this.clickLogutButton();
  }
}