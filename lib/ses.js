const SES = require('aws-sdk/clients/ses')

const { EMAIL_TO, EMAIL_FROM } = require('../config')

const call = (action, params) => {
  const ses = new SES({ region: process.env.REGION })
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
    ReplyToAddresses: [EMAIL_FROM],
    ConfigurationSetName: 'ConfigSet',
    Source: EMAIL_FROM
  }

  const data = await call('sendTemplatedEmail', params)
    .catch((err) => {
      return { status: err.message }
    })
  if (data && typeof data.ResponseMetadata === 'object') {
    return { status: 'sent' }
  }
}
