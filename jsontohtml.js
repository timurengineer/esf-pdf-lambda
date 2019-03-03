const ejs = require('ejs')

const jsonToHtml = (json, callback) => {
  const filename = __dirname + '/invoiceTemplate.ejs'
  const data = JSON.parse(json)
  const options = { rmWhitespace: true }

  ejs.renderFile(filename, data, options, callback)
}

module.exports = jsonToHtml
