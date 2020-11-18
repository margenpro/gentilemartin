const { createExchanger } = require('./exchanger');
require('dotenv').config()

const apiKey = process.env.C_API_KEY
const cryptoSymbols = process.env.C_SYMBOLS
const exchanger = createExchanger(apiKey, cryptoSymbols)

const exchangerFactory = {
    getExchanger: () => exchanger
}

module.exports = exchangerFactory