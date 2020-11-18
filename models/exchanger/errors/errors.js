function invalidArgsError(msg, param) {
    const errMsg = `${msg}: ${param}`
    const error = new Error(errMsg)
    error.type = 'INVALID_ARGS'
    return error
}

function apiNotRespondingError(msg) {
    const errMsg = `${msg}: No responde`
    const error = new Error(errMsg)
    error.type = 'NOT_FOUND'
    return error
}

module.exports = {
    invalidArgsError,
    apiNotRespondingError
}