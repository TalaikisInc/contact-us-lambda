const legit = require('legit')

const { t, setLocale } = require('../translations')

module.exports.validateRequest = async (body) => {
  const email = typeof body.email === 'string' ? body.email : false
  const msg = typeof body.msg === 'string' ? body.msg : false
  const name = typeof body.name === 'string' ? body.name : false
  const locale = typeof body.locale === 'string' ? body.locale : 'en'
  const validKey = body.key ? body.key === process.env.API_KEY : false
  if (validKey) {
    if (locale !== 'en') {
      setLocale(locale)
    }

    if (email && msg && name) {
      const res = await legit(email).catch((_) => {
        return { status: t('email_check_error') }
      })
      if (res.isValid) {
        return true
      } else {
        return { status: t('email_error') }
      }
    } else {
      return { status: t('error_required') }
    }
} else {
    return { status: t('unauthorized') }
  }
}
