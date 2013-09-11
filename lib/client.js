var request = require('request');

var currentToken
  , currentApiKey
  , baseUrl = 'https://api.constantcontact.com/v2/';

// PUBLIC

function useToken (token) {
  if (!token || typeof token !== 'string') { return cb(new Error("You must provide a token.")); }
  currentToken = token;
}

function useKey (key) {
  if (!key || typeof key !== 'string') { return cb(new Error("You must provide a key.")); }
  currentApiKey = key;
}

function notReadyError () {
  var cb = arguments[arguments.length - 1];
  return cb(new Error("this call is not ready yet."));
}

var contacts = {
  get: function (options, cb) {
    var call = {
      method: 'GET',
      url: baseUrl + 'contacts',
      qs: options
    };
    sendRequest(call, cb);
  },
  post: notReadyError,
  getOne: function (id, cb) {
    var call = {
      method: 'GET',
      url: baseUrl + 'contacts/' + id
    };
    sendRequest(call, cb);
  },
  put: notReadyError,
  del: notReadyError
}

var lists = {
  get: function (options, cb) {
    var call = {
      method: 'GET',
      url: baseUrl + 'lists',
      qs: options
    };
    sendRequest(call, cb);
  },
  post: notReadyError,
  getOne: function (id, cb) {
    var call = {
      method: 'GET',
      url: baseUrl + 'lists/' + id
    };
    sendRequest(call, cb);
  },
  put: notReadyError,
  del: notReadyError,
  getContacts: notReadyError
}

// PRIVATE

function sendRequest (call, cb) {
  if (!currentApiKey) { return cb(new Error("No key provided for client.")); }
  if (!currentToken) { return cb(new Error("No token provided for call.")); }
  
  call.headers = {
    Authorization: "Bearer " + currentToken
  }
  call.qs = call.qs || {};
  call.qs.api_key = currentApiKey;
  console.log(call);
  request(call, handleResponse(cb));
}

function handleResponse (cb) {
  return function (err, res, data) {
    if (err) { return cb(err); }
    if (data.error) { return cb(new Error(data.error)); }
    if (typeof data === 'string') {
      try {
        var parsed = JSON.parse(data);
        data = parsed;
      } catch (e) {
        console.log('error parsing response');
      }
    }
    return cb(null, data);
  }
}


module.exports = {
    useKey: useKey
  , useToken: useToken
  , contacts: contacts
}