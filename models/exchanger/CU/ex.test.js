const { exchangerFactoryCu } = require('./CuExchangerFactory')

async function main() {

    try {
        const CU = await exchangerFactoryCu.getCUGetAllExchanges()
        console.log(await CU.invoke())
    } catch (e) {
        console.warn(e.message)
    }
}
main()