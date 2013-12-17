# node-constantcontact

node.js api wrapper for constant contact v2 api

## WARNING!

This API wrapper is very incomplete at the moment. I will continue to fill it out and improve the docs over the next couple of weeks. Let me know if there's something you're itching for in the meantime.

## install

    npm install constantcontact

## use

    var Client = require('constantcontact');

    var client = new Client();
    
    client.useKey("MY_API_KEY");
    client.useToken("MY_ACCESS_TOKEN");
    client.campaigns.get(function (err, res) {
      if (err) { throw err; }
      console.log(res);
    });
