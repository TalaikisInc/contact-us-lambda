const { locale, fallback, set, t } = require('frenchkiss')

const en = require('./en')
const fr = require('./fr')

set('fr', fr)
set('en', en)

module.exports.setLocale = (loc) => {
  locale(loc)
}

fallback('en')

module.exports.t = t
