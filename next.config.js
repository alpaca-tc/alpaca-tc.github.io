/* eslint @typescript-eslint/no-var-requires: "off" */
const path = require('path')

module.exports = {
  future: {
    webpack5: true,
  },
  webpack(config) {
    config.resolve.alias = {
      ...config.resolve.alias,
      src: path.join(__dirname, 'src/'),
    }
    return config
  },
  env: {
    origin: 'https://alpaca.tc'
  }
}
