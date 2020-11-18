const { createCryptoApi } = require("./models/exchanger/api/cryptoApi")
const { createServer } = require('./server/server')
const { createCryptosDao } = require('./models/exchanger/dao/cryptosDaoFactory')

async function main() {

    try {
        const cryptosDao = await createCryptosDao()
        const cryptoApi = await createCryptoApi(cryptosDao)
        await createServer(cryptoApi)
        
    } catch (e) {
        console.log(e.message)
    }
}
main()