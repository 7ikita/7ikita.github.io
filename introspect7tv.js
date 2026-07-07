const https = require('https');
const query = `query { __schema { queryType { name } types { name kind fields { name description args { name type { kind name ofType { kind name ofType { kind name } } } } type { kind name ofType { kind name } } } } } }`;
const data = JSON.stringify({ query });
const req = https.request({
  hostname: '7tv.io',
  path: '/v3/gql',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(data)
  }
}, res => {
  let body = '';
  res.on('data', (chunk) => body += chunk);
  res.on('end', () => {
    console.log(body);
  });
});
req.on('error', (e) => console.error('ERR', e));
req.write(data);
req.end();
