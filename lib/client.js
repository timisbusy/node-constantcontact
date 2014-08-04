var request = require('request');

var baseUrl = 'https://api.constantcontact.com/v2/'
  , paginationBase = 'https://api.constantcontact.com';

function Client () {
  // PUBLIC
  var self = this;
  self.token;
  self.key;

  function useToken (token) {
    if (!token || typeof token !== 'string') { return cb(new Error("You must provide a token.")); }
    self.token = token;
  }

  function useKey (key) {
    if (!key || typeof key !== 'string') { return cb(new Error("You must provide a key.")); }
    self.key = key;
  }


  function followPagination (link, cb) {
    if (!link || typeof link !== 'string') { return cb(new Error("link must be provided")); }

    var call = {
        method: 'GET',
        url: paginationBase + link
      };

    sendRequest(call, cb);
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
    post: function (contact, actionByVisitor, cb) {
          // 'contact' should follow this format: http://developer.constantcontact.com/docs/contacts-api/contacts-collection.html?method=POST#example-json-request-body
          var actionBy = actionByVisitor ? 'ACTION_BY_VISITOR' : 'ACTION_BY_OWNER';
          var qs = {};
          qs['action_by'] = actionBy;
          var call = {
              method: 'POST',
              qs: qs,
              url: baseUrl + 'contacts',
              json: contact
          };
          sendRequest(call, cb);
    },
    put: function (contact, actionByVisitor, cb) {
          // 'contact' should follow this format: http://developer.constantcontact.com/docs/contacts-api/contacts-collection.html?method=POST#example-json-request-body
          var actionBy = actionByVisitor ? 'ACTION_BY_VISITOR' : 'ACTION_BY_OWNER';
          var qs = {};
          qs['action_by'] = actionBy;
          var call = {
              method: 'PUT',
              qs: qs,
              url: baseUrl + 'contacts/' + contact.id,
              json: contact
          };
          sendRequest(call, cb);
    },
    getOne: function (id, cb) {
      var call = {
        method: 'GET',
        url: baseUrl + 'contacts/' + id
      };
      sendRequest(call, cb);
    },
    del: notReadyError,
    tracking: contactTracking,
    verifiedEmails: notReadyError
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



  // PRIVATE

  function sendRequest (call, cb) {
    if (!self.key) { return cb(new Error("No key provided for client.")); }
    if (!self.token) { return cb(new Error("No token provided for call.")); }

    call.headers = {
      Authorization: "Bearer " + self.token
    }
    call.qs = call.qs || {};
    call.qs.api_key = self.key;
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
          return cb(new Error("Error parsing constantcontact response."));
        }
      }
      if (data.error) { return cb(new Error(data.error)); }
      if (data && data.length && data.length > 0 && data[0].error_message) { return cb(new Error(data[0].error_message)); }
      return cb(null, data);
    }
  }

  function notReadyError () {
    var cb = arguments[arguments.length - 1];
    return cb(new Error("this call is not ready yet."));
  }



  return {
      useKey: useKey
    , useToken: useToken
    , contacts: contacts
    , lists: lists
    , campaigns: campaigns
    , sendRequest: sendRequest
    , followPagination: followPagination
  };
}

module.exports = Client;
