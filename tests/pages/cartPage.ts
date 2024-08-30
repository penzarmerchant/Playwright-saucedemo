import { Page, Locator } from '@playwright/test';
import BasePage from './basepage';


export class CartPage extends BasePage {

  private readonly checkoutButton: Locator;
  private readonly removeBackPackButton:Locator;
  private readonly allItemName:Locator;
  
  constructor(page: Page) {
    super(page)
    this.checkoutButton = page.locator('#checkout');
    this.removeBackPackButton=page.locator('#remove-sauce-labs-backpack');
    this.allItemName=page.locator('div[data-test="inventory-item-name"]')
  }
  
  // Method to operate the Locators
  async clickcheckoutButton() {
    await this.clickelement(this.checkoutButton);
  }

  async removeItembackpack(){
    await this.clickelement(this.removeBackPackButton);
  }

 async allItemNameCount():Promise<number>{
    const allelements= await this.allItemName.all();
    const productItemName=[];
    for(let e of allelements){
      const nameText=await e.textContent();
      productItemName.push(nameText);
    }
    return productItemName.length
 }
}
