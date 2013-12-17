var Client = new require('./index')
  , conf = require('./conf');

var client = new Client();
client.useKey(conf.apiKey);
client.useToken(conf.testToken);

client.contacts.get({ limit: 1 }, logResultAndFollow);

// checking out pagination links

function logResultAndFollow (err, result) {
  if (err) { throw err; }
  console.log(result);
  if (result.meta && result.meta.pagination && result.meta.pagination.next_link) {
    client.followPagination(result.meta.pagination.next_link, logResultAndFollow); // recurs to add next page of results.
  } else {
    return console.log('done!');
  }
}
