const wkhtmltopdf = require('wkhtmltopdf');
const MemoryStream = require('memorystream');
const jsonToHtml = require('./jsontohtml');

process.env['PATH'] = process.env['PATH'] + ':' + process.env['LAMBDA_TASK_ROOT'];

exports.handler = (event, context, callback) => {
  const memStream = new MemoryStream();
  const options = {};
  
  jsonToHtml(event.body, (err, html) => {
    wkhtmltopdf(html, options, () => {
      const result = {
        statusCode: 200,
        body: JSON.stringify({
          pdfBase64: memStream.read().toString('base64')
        })
      };
  
      callback(null, result);
    })
      .pipe(memStream);	
  });
};
