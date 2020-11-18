const { createDbClient } = require('../../../database/connection')

async function createCryptosDaoCollection(dbname, collectionName) {
    const client = await createDbClient()
    try {
        console.log("Connecting to mongodb...")
        await client.connect()
        console.log("Connection successful!")
    } catch (e) {
        throw new Error("Connection to mongodb failed")
    }
    const db = await client.db(dbname)
    const cryptosColl = await db.collection(collectionName)
    return {
        getAll: async () => {
            return await cryptosColl.find().toArray()
        },
        getHistoricalBySymbol: async (symbol) => {
            const historical = await cryptosColl.find({symbol}).toArray()
            return historical
        },
        close: async () => {
            await client.close()
            console.log("Connection to mongodb closed")
        }
    }
}


module.exports = { createCryptosDaoCollection }