const { createCuHistoricalBySymbol } = require('./CuHistoricalBySymbol')
const charterFactory = require('../models/charter/charterFactory')
const { createCryptosDao } = require('../models/exchanger/dao/cryptosDaoFactory')
const { mailerFactory } = require('../models/mailer/mailerFactory')
require('dotenv').config()


const cuHistoricalFactory = {
    getCuHistorical: async () => createCuHistoricalBySymbol(
        await createCryptosDao(),
        charterFactory.getCharter(),
        mailerFactory.getMailer(),
        process.env.CHART_NAME,
        process.env.CHART_PATH
    )
}

module.exports = { cuHistoricalFactory }
