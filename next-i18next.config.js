const HttpBackend = require('i18next-http-backend/cjs')
const ChainedBackend= require('i18next-chained-backend').default
const LocalStorageBackend = require('i18next-localstorage-backend').default

const isBrowser = typeof window !== 'undefined'
const isDev = process.env.NODE_ENV === 'development'

module.exports = {
  debug: isDev,
  backend: {
    backendOptions: [{ expirationTime: isDev ? 0 : 60 * 60 * 1000 }, {}], // 1 hour
    backends: isBrowser ? [LocalStorageBackend, HttpBackend] : [],
  },
  partialBundledLanguages: isBrowser && true,
  i18n: {
    defaultLocale: 'zh-Hans',
    locales: ['zh-Hans', 'zh-Hant', 'en'],
    localeDetection: false,
  },
  serializeConfig: false,
  use: isBrowser ? [ChainedBackend] : [],
}