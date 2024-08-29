import {Page,Locator} from '@playwright/test'
import BasePage from './basepage';

export class LoginPage extends BasePage
{
 //Locators
 private readonly usernameTextBox:Locator;
 private readonly passwordTextBox:Locator;
 private readonly loginButton:Locator;
 private readonly errorMessage:Locator;
 
 constructor(page:Page)
 {
    super(page);
    this.usernameTextBox=page.locator('#user-name');
    this.passwordTextBox=page.locator('#password');
    this.loginButton=page.locator('#login-button');
    this.errorMessage=page.locator('h3[data-test="error"]')
 }
 //Method to operate the Locators

 async enterUsername(usernameText:string)
 {
    await this.fillField(this.usernameTextBox,usernameText);
 }
 async enterPassword(passwordText:string)
 {
    await this.fillField(this.passwordTextBox,passwordText);
 }

async clickLoginbutton()
 {
    await this.clickelement(this.loginButton);
 }

 async loginUser(usernameText:string,passwordText:string){
 await this.enterUsername(usernameText);
 await this.enterPassword(passwordText);
 await this.clickLoginbutton();
 }

 async getErrorMessage():Promise<string>{
   return await this.getElementText(this.errorMessage);
 }

 async isLoginButtonVisible():Promise<boolean>{
   return this.isElementVisible(this.loginButton);
 }
}
