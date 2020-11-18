const { MongoClient } = require('mongodb')
require('dotenv').config()

const uri = process.env.CNX_STR_DB

async function createDbClient() {
    return await new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true })
}

module.exports = {
    createDbClient
}