import { Page, Locator } from '@playwright/test';
import BasePage from './basepage';

export class InventoryPage extends BasePage {
  // Locators
  private readonly addbackpack: Locator;
  private readonly addbacklight: Locator;
  private readonly tshirt: Locator;
  private readonly addfleeceJacket: Locator;
  private readonly removebackpack: Locator;
  private readonly removefleecejacket: Locator;
  private readonly cartLogo: Locator;
  private readonly backpackimage:Locator;
  private readonly sortButton:Locator;
  private readonly allItemName:Locator;
  private readonly allItemPrice:Locator;

  constructor(page: Page) {
    
    super(page);
    this.addbackpack = page.locator('#add-to-cart-sauce-labs-backpack');
    this.addbacklight=page.locator('#add-to-cart-sauce-labs-bike-light');
    this.addfleeceJacket=page.locator('#add-to-cart-sauce-labs-fleece-jacket')
    this.removebackpack=page.locator('#remove-sauce-labs-backpack');
    this.removefleecejacket=page.locator('#remove-sauce-labs-fleece-jacket');
    this.tshirt=page.locator('button[name="add-to-cart-test.allthethings()-t-shirt-(red)"]');
    this.cartLogo = page.locator('a[class="shopping_cart_link"]');
    this.backpackimage=page.locator('#item_4_img_link');
    this.sortButton=page.locator('select[data-test="product-sort-container"]');
    this.allItemName=page.locator('div[data-test="inventory-item-name"]');
    this.allItemPrice=page.locator('div[data-test="inventory-item-price"]');
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

  async sortProducts(sortType:string){
    await this.sortButton.selectOption(sortType)
  }

  async getAllProductItemName():Promise<string[]>{
    const allelements=await this.allItemName.all();
    let allProductNameText=[];
    for(let e of allelements){
      const nameText =await e.textContent();
      allProductNameText.push(nameText);
    }  
    return allProductNameText
 }

 async getAllProductItemPrice():Promise<number[]>{
  const allelements=await this.allItemPrice.all();
  let allProductPriceText=[];
  for(let e of allelements){
    const priceText =(await e.textContent()).replace('$','').trim();
    const priceNumber=parseFloat(priceText);
    allProductPriceText.push(priceNumber);
  }  
  return allProductPriceText
}

async isSortButtonVisible():Promise<boolean>{
  return this.isElementVisible(this.sortButton);
}
}
