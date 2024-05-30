import { Page, Locator } from '@playwright/test';
import BasePage from './basepage';

export class checkoutPage extends BasePage {
    readonly page:Page   
 private readonly firstNameTextBox:Locator;
 private readonly lastNameTextBox:Locator;
 private readonly pincodeTextBox:Locator;
 private readonly continueButton:Locator;
 private readonly cancelButton:Locator;

 constructor(page:Page)
 {
    super(page);
    this.firstNameTextBox=page.locator('//input[@id="first-name"]');
    this.lastNameTextBox=page.locator('//input[@id="last-name"]');
    this.pincodeTextBox=page.locator('//input[@id="postal-code"]');
    this.continueButton=page.locator('#continue');
    this.cancelButton=page.locator('//button[@name="cancel"]')
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
 
}


