const axios = require('axios')
const { invalidArgsError, apiNotRespondingError } = require('./errors/errors')

const quotesUrl = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest'
/**
 * @param ApiKey 
 * @param cryptoSymbols 
 * Recibe un string con la Api Key de CoinMarketCap y una lista de strings con los simbolos de las 
 * cryptos a trabajar
 */
function createExchanger(ApiKey, cryptoSymbols) {

    return {
        /**
         * @param symbol 
         * Recibe un string como simbolo de una cryptomoneda y si es válido
         * devuelve la misma sino arroja excepción
         */
        getExchangeBySymbol: async (symbol) => {

            let res

            if (!cryptoSymbols.includes(symbol)) {
                throw new invalidArgsError("El simbolo ingresado es incorrecto", symbol)
            }

            try {
                res = await axios.get(quotesUrl, {
                    params: {
                        symbol, 
                        CMC_PRO_API_KEY: ApiKey
                    }
                })

            } catch (error) {
                throw new apiNotRespondingError("Error de conexión a Coinmarketcap")
            }
            return getCryptoList(res.data.data)[0]
        },

        /**
         * Devuelve una lista con todas las criptomonedas utilizadas en el sistema con
         * su nombre, simbolo y cotización en dólares. Arroja excepción
         */
        getAllExchanges: async () => {
            let cryptoList = null
            try {
                let res = await axios.get(quotesUrl, {
                    params: {
                        symbol: cryptoSymbols.toString(),
                        CMC_PRO_API_KEY: ApiKey
                    }
                })
                cryptoList = getCryptoList(res.data.data)
            } catch (error) {
                throw new apiNotRespondingError("Error de conexión a Coinmarketcap")
            }
            return cryptoList
        },
        /**
         * Recibe un array de strings con los symbolos de las criptomonedas a buscar
         * y devuelve una lista de objetos crypto
         * @param cryptoSymbolsList - array de string con simbolos de cripto
         */
        getExchangesListBySymbol: async (cryptoSymbolsList) => {
            let cryptoList = null
            try {
                let res = await axios.get(quotesUrl, {
                    params: {
                        symbol: cryptoSymbolsList.toString(),
                        CMC_PRO_API_KEY: ApiKey
                    }
                })
                cryptoList = getCryptoList(res.data.data)
            } catch (error) {
                throw new apiNotRespondingError("Error de conexión a Coinmarketcap")
            }
            return cryptoList
        }
    }
}

function getCryptoList(data) {
    let cryptoList = []
    for (let d in data) {
        let cryp = {
            id: data[d].id,
            name: data[d].name,
            symbol: data[d].symbol,
            quote: data[d].quote.USD.price
        }
        cryptoList.push(cryp)
    }
    return cryptoList
}

module.exports = {
    createExchanger
}