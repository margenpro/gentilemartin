const { createCryptosDaoCollection } = require('./CryptosDao')
require('dotenv').config()

async function createCryptosDao() {
    return await createCryptosDaoCollection(process.env.DB_NAME, process.env.CRYPTO_COLL_NAME)
}

module.exports = { createCryptosDao }