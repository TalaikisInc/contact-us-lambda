const AWS = require('aws-sdk')
AWS.config.update({ region: process.env.REGION })

module.exports.createEmailTemplates = () => {
  const ses = new AWS.SES()

  const templates = {
    0: {
      Template: {
        TemplateName: 'ContactUs',
        SubjectPart: 'You\'ve got message',
        HtmlPart: '<p><strong>Name: </strong>{{name}}</p><p><strong>Email: </strong>{{email}}<p><strong>Message: </strong>{{msg}}</p></p>',
        TextPart: 'Name: {{name}}. Email: {{email}}. Message: {{msg}}'
      }
    }
  }

  Object.keys(templates).forEach((id) => {
    ses.createTemplate(templates[id], (err, data) => {
      if (err) console.log(err.message)
      else console.log(data)
    })
  })
}
