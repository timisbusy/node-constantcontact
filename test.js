var client = require('./index')
  , conf = require('./conf');

client.useKey(conf.apiKey);
client.useToken(conf.testToken);
client.contacts.getOne('1', function (err, res) {
  if (err) { throw err; }
  console.log(res);
});