'use strict';

const ConstantContact = require('../lib/');
const config = require('../conf'); // { apiKey: '...', accessToken: '...' }

const cc = new ConstantContact(config);

let req = cc.contacts.find({ limit: 1 });

cc.paginate(
  req, 
  (result) => console.log(result),
  (error) => console.error(error),
  () => console.log('done!')
);
