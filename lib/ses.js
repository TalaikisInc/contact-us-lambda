const AWS = require('aws-sdk')

const { EMAIL_TO } = require('../config')

const call = (action, params) => {
  const ses = new AWS.SES({ region: 'us-east-1' })
  return ses[action](params).promise()
}

module.exports.contactUs = async (email, name, msg) => {
  const params = {
    Destination: {
      ToAddresses: [EMAIL_TO]
    },
    Template: 'ContactUs',
    TemplateData: JSON.stringify({
      email,
      name,
      msg
    }),
    ReplyToAddresses: [EMAIL_TO],
    ConfigurationSetName: 'ConfigSet',
    Source: EMAIL_TO
  }

  const data = await call('sendTemplatedEmail', params)
    .catch((err) => {
      return { status: err.message }
    })
  if (data && typeof data.ResponseMetadata === 'object') {
    return { status: 'sent' }
  }
}
