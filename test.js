var client = require('./index')
  , conf = require('./conf');

client.useKey(conf.apiKey);
client.useToken(conf.testToken);
client.campaigns.get(function (err, res) {
  if (err) { throw err; }
  console.log(res);
});