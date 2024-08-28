import { Page, Locator } from '@playwright/test';
import BasePage from './basepage';

export class checkoutPage extends BasePage { 
 private readonly firstNameTextBox:Locator;
 private readonly lastNameTextBox:Locator;
 private readonly pincodeTextBox:Locator;
 private readonly  continueButton:Locator;
 private readonly cancelButton:Locator;
 private readonly errorMessage:Locator;
 private readonly totalPriceText:Locator;
 
 constructor(page:Page)
 {
    super(page);
    this.firstNameTextBox=page.locator('#first-name');
    this.lastNameTextBox=page.locator('#last-name');
    this.pincodeTextBox=page.locator('#postal-code');
    this.continueButton=page.locator('#continue');
    this.cancelButton=page.locator('button[name="cancel"]')
    this.errorMessage=page.locator('h3[data-test="error"]');
    this.totalPriceText=page.locator('div[data-test="total-label"]')
 }
 
 //Method to operate the Locators

 async enterfirstName(firstNameText:string)
 {
    await this.fillField(this.firstNameTextBox,firstNameText);
 }

 async enterlastName(lastNameText:string)
 {
    await this.fillField(this.lastNameTextBox,lastNameText);
 }

 async enterpincode(pincodeText:string)
 {
    await this.fillField(this.pincodeTextBox,pincodeText);
 }

async clickcontinue()
 {
   
    this.clickelement(this.continueButton);
 }

 async clickCancel()
 {
   this.clickelement(this.cancelButton);
 }

 async isContinueButtonEnabled()
 {

   return this.continueButton.isEnabled();
   
 }
 async getErrorMessageText():Promise<string>
 {

      return await this.getElementText(this.errorMessage);
}

async completeCheckout(firstName:string,lastName:string,pincode:string){
   await this.enterfirstName(firstName);
    await this.enterlastName(lastName);
    await this.enterpincode(pincode);
    await this.clickcontinue();
}
async getTotalPriceText():Promise<number>{
   const priceText=await this.getElementText(this.totalPriceText);
   let cleanedPriceText=priceText.replace('$','').trim();
   cleanedPriceText=cleanedPriceText.replace(/[^0-9.-]+/g,'');
   const totalPrice=parseFloat(cleanedPriceText);
   return totalPrice;
}

async getAllProductPriceListTotal():Promise<number>{
   const allelements=await this.page.$$('div[data-test="inventory-item-price"]');
   let productPriceSum=0;
   for(let e of allelements){
     const priceText =await e.textContent();
     if(!priceText || typeof priceText!=='string'){
      console.error('Invalid Price text format');
      continue;
     }
     const cleanedPriceText= priceText.replace('$','').trim();
     const priceNumber=parseFloat(cleanedPriceText);
     if(isNaN(priceNumber))
     {
      console.error('Failed to parse Price Text: ', cleanedPriceText)
      continue;
     }
     productPriceSum+=priceNumber; 
   }
   productPriceSum+=productPriceSum*0.08; 
   const roundedSum=Number(productPriceSum.toFixed(2));
   return roundedSum;
}
}