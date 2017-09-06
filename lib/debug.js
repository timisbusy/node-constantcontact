const debug = require('debug');

module.exports = (channel) => debug('constantcontact' + (channel ? `:${channel}` : ''));
