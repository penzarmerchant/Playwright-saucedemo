import { test, expect } from '@fixtures/pomFixture'
import * as saucedemoData from '@testData/sauceDemoCredentials.json'

const invalidCredentialError = 'Epic sadface: Username and password do not match any user in this service';
const usernameBlankError = 'Epic sadface: Username is required';
const passwordBlankError = 'Epic sadface: Password is required';

test.beforeEach(async ({ page}) => {
    await page.goto('/');
});

test('Verify successful login with valid credentails', async ({loginPage,inventoryPage }) => {
    await loginPage.loginUser(saucedemoData.validUsername, saucedemoData.validPassword);
    expect(await inventoryPage.isSortButtonVisible()).toBeTruthy();
})

test('Verify unsuccessful login with invalid username and password', async ({loginPage }) => {
    await loginPage.loginUser(saucedemoData.invalidUsername,saucedemoData.invalidPassword);
    expect(await loginPage.getErrorMessage()).toEqual(invalidCredentialError);
})

test('Verify unsuccessful login with invalid username', async ({loginPage }) => {
    await loginPage.loginUser(saucedemoData.invalidUsername,saucedemoData.validPassword);
    expect(await loginPage.getErrorMessage()).toEqual(invalidCredentialError);
})

test('Verify unsuccessful login with invalid password', async ({loginPage }) => {
    await loginPage.loginUser(saucedemoData.validUsername,saucedemoData.invalidPassword);
    expect(await loginPage.getErrorMessage()).toEqual(invalidCredentialError);
})

test('Verify unsuccessful login with blank username and password', async ({loginPage }) => {
    await loginPage.loginUser(saucedemoData.blankUsername,saucedemoData.blankPassword);
    expect(await loginPage.getErrorMessage()).toEqual(usernameBlankError);
})

test('Verify unsuccessful login with blank username', async ({loginPage }) => {
    await loginPage.loginUser(saucedemoData.blankUsername,saucedemoData.validPassword);
    expect(await loginPage.getErrorMessage()).toEqual(usernameBlankError);
})

test('Verify unsuccessful login with blank password', async ({loginPage }) => {
    await loginPage.loginUser(saucedemoData.validUsername,saucedemoData.blankPassword);
    expect(await loginPage.getErrorMessage()).toEqual(passwordBlankError);
})