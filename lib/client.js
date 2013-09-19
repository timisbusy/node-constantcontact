var request = require('request');

var currentToken
  , currentApiKey
  , baseUrl = 'https://api.constantcontact.com/v2/'
  , paginationBase = 'https://api.constantcontact.com';

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
    if (typeof options === 'function') {
      cb = options;
      options = {};
    }
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
  del: notReadyError,
  tracking: contactTracking,
  verifiedEmails: notReadyError
}

var contactTracking = {
  summary: notReadyError,
  campaignSummary: notReadyError,
  bounces: notReadyError,
  clicks: notReadyError,
  forwards: notReadyError,
  opens: notReadyError,
  sends: notReadyError,
  unsubscribes: notReadyError
}

var lists = {
  get: function (options, cb) {
    if (typeof options === 'function') {
      cb = options;
      options = {};
    }
    var call = {
      method: 'GET',
      url: baseUrl + 'lists',
      qs: options
    };
    sendRequest(call, cb);
  },
  post: notReadyError,
  getOne: function (id, cb) {
    if (!id || typeof id === "function") { return cb(new Error("id parameter must be provided."))}
    var call = {
      method: 'GET',
      url: baseUrl + 'lists/' + id
    };
    sendRequest(call, cb);
  },
  put: notReadyError,
  del: notReadyError,
  getContacts: function (id, options, cb) {
    if (!id || typeof id === "function") { return cb(new Error("id parameter must be provided."))}
    if (typeof options === 'function') {
      cb = options;
      options = {};
    }
    var call = {
      method: 'GET',
      url: baseUrl + 'lists/' + id + '/contacts',
      qs: options
    };
    sendRequest(call, cb);
  }
}

var campaigns = {
  get: function (options, cb) {
    if (typeof options === 'function') {
      cb = options;
      options = {};
    }
    var call = {
      method: 'GET',
      url: baseUrl + 'emailmarketing/campaigns',
      qs: options
    };
    sendRequest(call, cb);
  },
  post: notReadyError,
  getOne: function (id, cb) {
    if (!id || typeof id === "function") { return cb(new Error("id parameter must be provided."))}
    var call = {
      method: 'GET',
      url: baseUrl + 'emailmarketing/campaigns/' + id
    };
    sendRequest(call, cb);
  },
  put: notReadyError,
  del: notReadyError,
  tracking: campaignTracking,
  schedules: campaignSchedules,
  testSend: notReadyError
}

var campaignTracking = {
  bounces: function (id, options, cb) {
    if (!id || typeof id === "function") { return cb(new Error("id parameter must be provided."))}
    if (typeof options === "function") { 
      cb = options; 
      options = {}; 
    }
    var call = {
      method: 'GET',
      url: baseUrl + 'emailmarketing/campaigns/' + id + '/tracking/bounces',
      qs: options
    };
    sendRequest(call, cb);
  },
  clicks: function (id, options, cb) {
    if (!id || typeof id === "function") { return cb(new Error("id parameter must be provided."))}
    if (typeof options === "function") { 
      cb = options; 
      options = {}; 
    }
    var call = {
      method: 'GET',
      url: baseUrl + 'emailmarketing/campaigns/' + id + '/tracking/clicks',
      qs: options
    };
    sendRequest(call, cb);
  },
  forwards: function (id, options, cb) {
    if (!id || typeof id === "function") { return cb(new Error("id parameter must be provided."))}
    if (typeof options === "function") { 
      cb = options; 
      options = {}; 
    }
    var call = {
      method: 'GET',
      url: baseUrl + 'emailmarketing/campaigns/' + id + '/tracking/forwards',
      qs: options
    };
    sendRequest(call, cb);
  },
  opens: function (id, options, cb) {
    if (!id || typeof id === "function") { return cb(new Error("id parameter must be provided."))}
    if (typeof options === "function") { 
      cb = options; 
      options = {}; 
    }
    var call = {
      method: 'GET',
      url: baseUrl + 'emailmarketing/campaigns/' + id + '/tracking/opens',
      qs: options
    };
    sendRequest(call, cb);
  },
  sends: function (id, options, cb) {
    if (!id || typeof id === "function") { return cb(new Error("id parameter must be provided."))}
    if (typeof options === "function") { 
      cb = options; 
      options = {}; 
    }
    var call = {
      method: 'GET',
      url: baseUrl + 'emailmarketing/campaigns/' + id + '/tracking/sends',
      qs: options
    };
    sendRequest(call, cb);
  },
  summary: function (id, options, cb) {
    if (!id || typeof id === "function") { return cb(new Error("id parameter must be provided."))}
    if (typeof options === "function") { 
      cb = options; 
      options = {}; 
    }
    var call = {
      method: 'GET',
      url: baseUrl + 'emailmarketing/campaigns/' + id + '/tracking/reports/summary',
      qs: options
    };
    sendRequest(call, cb);
  },
  unsubscribes: function (id, options, cb) {
    if (!id || typeof id === "function") { return cb(new Error("id parameter must be provided."))}
    if (typeof options === "function") { 
      cb = options; 
      options = {}; 
    }
    var call = {
      method: 'GET',
      url: baseUrl + 'emailmarketing/campaigns/' + id + '/tracking/unsubscribes',
      qs: options
    };
    sendRequest(call, cb);
  },
  linkClicks: function (id, linkId, options, cb) {
    if (!id || typeof id === "function") { return cb(new Error("id parameter must be provided."))}
    if (!linkId || typeof linkId === "function") { return cb(new Error("linkId parameter must be provided."))}
    if (typeof options === "function") { 
      cb = options; 
      options = {}; 
    }
    var call = {
      method: 'GET',
      url: baseUrl + 'emailmarketing/campaigns/' + id + '/tracking/clicks/' + linkId,
      qs: options
    };
    sendRequest(call, cb);
  }
}

var campaignSchedules = {
  get: notReadyError,
  post: notReadyError,
  getOne: notReadyError,
  put: notReadyError,
  del: notReadyError
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
    if (typeof data === 'string') {
      try {
        var parsed = JSON.parse(data);
        data = parsed;
      } catch (e) {
        console.log('error parsing response');
      }
    }
    if (data.error) { return cb(new Error(data.error)); }
    return cb(null, data);
  }
}

function followPagination (link, cb) {
  if (!link || typeof link !== 'string') { return cb(new Error("link must be provided")); }

  var call = {
      method: 'GET',
      url: paginationBase + link
    };

  sendRequest(call, cb);
}


module.exports = {
    useKey: useKey
  , useToken: useToken
  , contacts: contacts
  , lists: lists
  , campaigns: campaigns
  , sendRequest: sendRequest
  , followPagination: followPagination
}