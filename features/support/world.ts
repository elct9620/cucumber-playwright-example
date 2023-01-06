import { BeforeAll, AfterAll, Before, setWorldConstructor } from "@cucumber/cucumber"
import * as playwright from 'playwright'
import * as fs from 'fs'
import * as path from 'path'
import * as esbuild from 'esbuild'

import DefaultServer from './server'

export default class ExampleWorld {
  public page: playwright.Page
  private context: playwright.BrowserContext

  async init(scenario) {
    this.context = await DefaultServer.newContext()
  }

  async open(url) {
    this.page = await this.context.newPage();
    await this.page.goto(url);
  }
}

setWorldConstructor(ExampleWorld);

BeforeAll(async function() {
  await DefaultServer.start();
});

AfterAll(async function() {
  await DefaultServer.stop()
})

Before(async function(scenario) {
  await this.init()
})
