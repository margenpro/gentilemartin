const exchangerFactory = require('../exchangerFactory')
const { createCUGetAllExchanges } = require('./CuExchanger.js')

const ex = exchangerFactory.getExchanger()

const exchangerFactoryCu = {
    getCUGetAllExchanges: async () => await createCUGetAllExchanges(ex)
}

module.exports = { exchangerFactoryCu }