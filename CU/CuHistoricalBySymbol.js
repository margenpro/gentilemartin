function createCuHistoricalBySymbol(dao, charter, mailer, chartName, chartPath) {
    return {
        invoke: async (symbol) => {
            const historico = await dao.getHistoricalBySymbol(symbol)
            await dao.close()
            const chart = charter.createChart(historico, 'fecha', 'quote')
            charter.saveChart(chart,chartPath, chartName)
            mailer.sendAttachment({
                receivers: 'martin_gentile@hotmail.com',
                subject: `Cotización historica de ${symbol}`,
                text: 'Se envia la cotización historica requerida',
                attName: 'grafico.png',
                attPath: `${chartPath}${chartName}.png`
            })
        }
    }
}

module.exports = {
    createCuHistoricalBySymbol
}

