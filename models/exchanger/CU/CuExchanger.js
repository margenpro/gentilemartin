function createCUGetAllExchanges(exchanger) {
    return {
        invoke: async () => await exchanger.getAllExchanges()
    }
}
module.exports = {
    createCUGetAllExchanges
}