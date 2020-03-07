const { success, failure } = require('./lib/response')
const { contactUs } = require('./lib/ses')
const { validateRequest } = require('./lib/validateRequest')

module.exports.handler = async (event, context) => {
  try {
    const body = JSON.parse(event.body)
    const notValid = await validateRequest(body)
    if (typeof notValid !== 'object') {
      const data = await contactUs(body.email, body.name, body.msg)
      return success(data)
    } else {
      return failure(notValid)
    }
  } catch (err) {
    return failure({ status: false })
  }
}
