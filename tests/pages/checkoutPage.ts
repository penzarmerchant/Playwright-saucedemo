import { Page, Locator } from '@playwright/test';
import BasePage from './basepage';

export class checkoutPage extends BasePage { 
 private readonly firstNameTextBox:Locator;
 private readonly lastNameTextBox:Locator;
 private readonly pincodeTextBox:Locator;
 private readonly  continueButton:Locator;
 private readonly cancelButton:Locator;
 private readonly errorMessage:Locator;
    

 constructor(page:Page)
 {
    super(page);
    this.firstNameTextBox=page.locator('#first-name');
    this.lastNameTextBox=page.locator('#last-name');
    this.pincodeTextBox=page.locator('#postal-code');
    this.continueButton=page.locator('#continue');
    this.cancelButton=page.locator('button[name="cancel"]')
    this.errorMessage=page.locator('h3[data-test="error"]');
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
}


