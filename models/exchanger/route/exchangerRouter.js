const express = require('express')

let wrap = fn => (...args) => fn(...args).catch(args[2])

function createExchangerRouter(api) {
    router = express.Router()

    router.get('/:symbol', wrap(async (req, res) => {
        const symbol = req.params.symbol
        const historical = await getHistorical(api,symbol)
        res.json(historical)
    }))
    return router
}

async function getHistorical(api, query){
    return api.getHistoricalBySymbol(query)
}
module.exports = { createExchangerRouter }
