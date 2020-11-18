const { cuHistoricalFactory } = require('./CuHisBySymbolFactory')

async function test(symbol) {
    const cu = await cuHistoricalFactory.getCuHistorical()
    cu.invoke(symbol)
}
test("BTC")