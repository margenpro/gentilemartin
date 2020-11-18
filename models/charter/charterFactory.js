const {createCharter} = require('./charter.js')

const charter = createCharter()

const charterFactory = {
    getCharter: () => charter 
}

module.exports = charterFactory