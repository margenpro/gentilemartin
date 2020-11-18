const express = require('express');
const { createExchangerRouter } = require('../models/exchanger/route/exchangerRouter');
require('dotenv').config

async function createServer(api) {
    const port = process.env.SERVER_PORT
    const app = express()
    app.use(express.json())
    app.use("/", createExchangerRouter(api))

    return new Promise((resolve, reject) => {
        const server = app.listen(port)
            .once('error', () => {
                reject(new Error('connection to server failed'))
            })
            .once('listening', () => {
                server.port = server.address().port
                resolve(server)
                console.log(`Connected to server in port ${port}`)
            })
    })
}

module.exports = { createServer }