import {Page,Locator} from '@playwright/test'
import BasePage from './basepage';

export class LoginPage extends BasePage
{
 //Locators
 private readonly usernameTextBox:Locator;
 private readonly passwordTextBox:Locator;
 private readonly loginButton:Locator;
 
 constructor(page:Page)
 {
    super(page);
    this.usernameTextBox=page.locator('//input[@id="user-name"]');
    this.passwordTextBox=page.locator('//input[@id="password"]');
    this.loginButton=page.locator('//input[@id="login-button"]');
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
}
