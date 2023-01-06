Cucumber with Playwright Example
===

Integrate cucumber with playwright which is design for ESbuild static site.

## Features

### Reuse browser

Launch the browser for each feature instead of the scenario using `BrowserContext` to ensure each scenario is isolated.

### Test with ESBuild server

The test server is built on ESBuild to serve static files which no need to run another one.
