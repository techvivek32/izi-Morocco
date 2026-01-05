const path = require('path')

process.env.NODE_PATH = path.resolve(__dirname, '../src')
process.env.NODE_ENV = 'development'

// Load all env variables
require('dotenv').config()
require('module').Module._initPaths()

// get current service name from env
const serviceName = process.env.SERVICE || 'rest'

// create path
const servicePath = path.join('..', 'src')

console.log('current service:', serviceName)

require(servicePath)
