import { Page, Locator } from '@playwright/test';
import BasePage from './basepage';

export class inventoryPage extends BasePage {
  // Locators
  readonly page: Page;
  private readonly addbackpack: Locator;
  private readonly addbacklight: Locator;
  private readonly tshirt: Locator;
  private readonly addfleeceJacket: Locator;
  private readonly removebackpack: Locator;
  private readonly removetshirt: Locator;
  private readonly removefleecejacket: Locator;
  private readonly cartLogo: Locator;
  private readonly backpackimage:Locator;

  constructor(page: Page) {
    
    super(page);
    this.addbackpack = page.locator('//button[@id="add-to-cart-sauce-labs-backpack"]');
    this.addbacklight=page.locator('//button[@id="add-to-cart-sauce-labs-bike-light"]');
    this.addfleeceJacket=page.locator('//button[@id="add-to-cart-sauce-labs-fleece-jacket"]')
    this.removebackpack=page.locator('//button[@id="remove-sauce-labs-backpack"]');
    this.removefleecejacket=page.locator('//button[@id="remove-sauce-labs-fleece-jacket"]');
    this.tshirt=page.locator('//button[@id="add-to-cart-test.allthethings()-t-shirt-(red)"]');
    this.cartLogo = page.locator('//a[@class="shopping_cart_link"]');
    this.backpackimage=page.locator('//a[@id="item_4_img_link"]');
  }

  // Method to operate the Locators
  async addBackpack() {
    await this.clickelement(this.addbackpack);
  }

  async addBacklight() {
    await this.clickelement(this.addbacklight);
  }

  async addtshirt() {
    await this.clickelement(this.tshirt);
  }

  async addFleeceJacket() {
    await this.clickelement(this.addfleeceJacket);
  }

  async removeItembackpack()
  {
    await this.clickelement(this.removebackpack);
  }

  async removeItemfleecejacket()
  {
    await this.clickelement(this.removefleecejacket);
  }

  async clickCartLogo() {
    await this.clickelement(this.cartLogo);
  }

  async clickbackpackImage()
  {
    await this.clickelement(this.backpackimage);
  }
}
