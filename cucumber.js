const path = require('path')
const defaultOptions = "--require features/support/env.js --require 'features/**/*.ts' --publish-quiet"
const tasks = path.join(__dirname, 'features', 'support', 'tasks')

module.exports = {
  default: `${defaultOptions} --strict --tags 'not @wip'`,
}
