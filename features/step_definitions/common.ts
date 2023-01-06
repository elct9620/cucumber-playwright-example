const { Then, When } = require('@cucumber/cucumber');
import { expect } from '@playwright/test';
import ExampleWorld from '../support/world'

When('I visit {string}', async function (this: ExampleWorld, url: string) {
  await this.open(url)
});

When('我打開網址 {string}', async function (this: ExampleWorld, url: string) {
  await this.open(url)
});

Then('I can see the title {string}', async function (this: ExampleWorld, title: string) {
  await expect(this.page).toHaveTitle(title)
});

Then('我可以看到網頁標題 {string}', async function (this: ExampleWorld, title: string) {
  await expect(this.page).toHaveTitle(title)
});

Then('I can see {string}', async function (this: ExampleWorld, text: string) {
  await expect(this.page.getByText('Hello World')).toBeVisible()
});

Then('我可以看到文字 {string}', async function (this: ExampleWorld, text: string) {
  await expect(this.page.getByText('Hello World')).toBeVisible()
});
