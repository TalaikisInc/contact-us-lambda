module.exports.success = (body) => {
  return buildResponse(200, body)
}

module.exports.failure = (body) => {
  return buildResponse(500, body)
}

const buildResponse = (statusCode, body) => {
  return {
    statusCode,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Methods': 'POST,OPTIONS',
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify(body)
  }
}
