const response = (statusCode, data, message, res) => {
    res.json(statusCode, {
        payload: data,
        status_code: statusCode,
        message: message,
    }
    )
}

module.exports = response