import * as playwright from 'playwright'
import * as fs from 'fs'
import * as path from 'path'
import { tmpdir } from 'os'
import * as esbuild from 'esbuild'

const defaultSourceDir = path.join(__dirname, '../../src')

class Server {
  readonly sourceDir: string
  readonly staticFiles: string[]

  private destDir: string
  private browser: playwright.Browser
  private server: esbuild.ServeResult

  constructor(sourceDir: string, staticFiles?: string[]) {
    this.sourceDir = sourceDir
    this.staticFiles = staticFiles
  }

  async start() {
    await this.prepareStaticFiles()
    await this.bootServer()
    await this.launchBrowser()
  }

  async newContext(): Promise<playwright.BrowserContext> {
    return this.browser.newContext({
      baseURL: `http://${this.server.host}:${this.server.port}`
    });
  }

  async stop() {
    if (this.server) {
      this.server.stop()
    }

    if (this.browser) {
      await this.browser.close()
    }

    this.server = this.browser = null
  }

  private async prepareStaticFiles(): Promise<void> {
    this.destDir = fs.mkdtempSync(path.join(tmpdir(), 'cucumber-'))
    const tasks: Promise<string>[] = this.staticFiles.map(filePath => {
      return new Promise((resolve, reject) => {
        const destPath = path.join(this.destDir, filePath)
        fs.copyFile(
          path.join(this.sourceDir, filePath),
          destPath,
          () => resolve(destPath)
        )
      })
    })

    return Promise.all(tasks).then(() => {})
  }

  private async bootServer() {
    if (this.server) {
      return
    }

    this.server = await esbuild.serve(
      {
        servedir: this.destDir
      },
      {
        entryPoints: ['src/app.ts'],
        outdir: path.join(this.destDir, 'js'),
        bundle: true,
      }
    )
  }

  private async launchBrowser() {
    if(this.browser) {
      return
    }

    this.browser = await playwright.chromium.launch();
  }
}

export const DefaultServer = new Server(
  defaultSourceDir,
  ['index.html']
)
export default DefaultServer
