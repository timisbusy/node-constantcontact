const assert = require('assert');
const entries = require('object.entries');
const extend = require('extend');
const dotProp = require('dot-prop');
const providers = require('@purest/providers');
const purest = require('purest')({
  request: require('request')
});
const debug = require('./debug');
const Resource = require('./resource');
const apiConfig = require('./api.json');

if (!Object.entries) {
  entries.shim();
}

debug('setup')('Loaded API configs:', Object.entries(apiConfig).length);

function ConstantContact(config = {}) {
  const client = purest({
    provider: 'constantcontact',
    config: providers
  });

  // Set the authentication credentials
  const { apiKey, accessToken } = config;
  assert.ok(apiKey, 'Missing config.apiKey');
  assert.ok(accessToken, 'Missing config.accessToken');

  this.client = () => client.auth(accessToken, apiKey);

  // Create all the API resources
  for (let [path, actions] of Object.entries(apiConfig)) {
    debug('setup')(`Setting up resource for ${path}`);
    const resource = new Resource(this.client, actions);
    dotProp.set(this, path, resource);
  }

  const follow = (url) => Resource.invokeRequest(this.client().get(url));

  this.paginate = (first, resolve, reject, finished) => {
    first.catch(reject).then((result) => {
      resolve(result);

      let next = dotProp.get(result, 'meta.pagination.next_link');
      if (next) {
        debug('pagination')(`Following pagination link: ${next}`);
        this.paginate(follow(next), resolve, reject, finished);
      } else if (typeof finished === 'function') {
        debug('pagination')('Pagination finished');
        finished();
      }
    });
  };

  this.bulkWait = (id, interval = 2000) => {
    debug('bulk')(`Polling bulk job ${id}`);

    return new Promise((resolve, reject) => {
      let poll = setInterval(() => {
        function stopPolling() {
          clearInterval(poll);
          debug('bulk')(`Polling ended for bulk job ${id}`);
        }

        this.bulk.activities.get({ id })
          .then((result) => {
            debug('bulk')(`Bulk job ${id}`, result);

            if (result.status === 'COMPLETE') {
              stopPolling();
              resolve(result);
            } else if (result.status === 'ERROR') {
              stopPolling();
              reject(result)
            }
          })
          .catch((error) => {
            stopPolling();
            reject(error);
          })
      }, interval);
    });
  };
}

module.exports = ConstantContact;
