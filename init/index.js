const { join } = require('path')
require('dotenv').config({ path: join(__dirname, '../.env') })
const { createEmailTemplates } = require('./ses');

(() => {
  console.log('Starting jobs....')
  createEmailTemplates()
})()
