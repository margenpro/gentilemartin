function createCryptoApi (cryptosDao) {
    return{
        getAll: async() => {
            return await cryptosDao.getAll()
        },
        getHistoricalBySymbol: async(symbol) =>{
            return await cryptosDao.getHistoricalBySymbol(symbol)
        }
    }
}

module.exports = {createCryptoApi}