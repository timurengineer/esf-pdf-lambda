const wkhtmltopdf = require('wkhtmltopdf');
const MemoryStream = require('memorystream');
const jsonToHtml = require('./jsontohtml');

process.env['PATH'] = process.env['PATH'] + ':' + process.env['LAMBDA_TASK_ROOT'];

exports.handler = (event, context, callback) => {
  const memStream = new MemoryStream();
  const options = {};
  
  jsonToHtml(event.body, (err, html) => {
    console.log(event)
    wkhtmltopdf(html, options, () => {
      const result = {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          pdfBase64: memStream.read().toString('base64')
        })
      };
  
      callback(null, result);
    })
      .pipe(memStream);	
  });
};
