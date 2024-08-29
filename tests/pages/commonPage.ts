import { Page, Locator } from '@playwright/test';
import BasePage from './basepage';

export class CommonPage extends BasePage {

  private readonly hamburgerIcon: Locator;
  private readonly allItemsButton:Locator;
  private readonly aboutButton:Locator;
  private readonly logoutButton:Locator;

  constructor(page: Page) {
    super(page)
    this.hamburgerIcon = page.locator('#react-burger-menu-btn');
    this.allItemsButton=page.locator('#inventory_sidebar_link');
    this.aboutButton=page.locator('#about_sidebar_link');
    this.logoutButton=page.locator('#logout_sidebar_link');
  }

  // Method to operate the Locators
  async clickHamburgerIcon() {
    await this.clickelement(this.hamburgerIcon);
  }

  async clickAllitems(){
    await this.clickelement(this.allItemsButton);
  }

  async clickAbout(){
    await this.clickelement(this.aboutButton);
  }

  async clickLogout(){
    await this.clickelement(this.logoutButton);
  }

}
