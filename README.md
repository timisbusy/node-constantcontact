# node-constantcontact

node.js API wrapper for Constant Contact v2 API

## WARNING!

This API wrapper is very incomplete at the moment. I will continue to fill it out and improve the docs over the next couple of weeks. Let me know if there's something you're itching for in the meantime.

## Install

    npm install constantcontact

## Use

### Setup

    var Client = require('constantcontact');

    var client = new Client();
    
    client.useKey("MY_API_KEY");
    client.useToken("MY_ACCESS_TOKEN");
    
### Get list of email campaigns
This collection method returns a list of email campaigns.

    client.campaigns.get(function (err, res) {
      if (err) { throw err; }
      console.log(res);
    });
    constantContactClient.contacts.get, {"email": info.email}
    
    
### Search for existing contact
Method for retrieving a list of contacts.

    var email = "test@example.org";
    client.contacts.get({"email": email}, function (err, res) {
        if (err) { throw err; }
        console.log(res);
    });


### Add new contact
Method for adding a Contact to a collection. See full structure of contact object: http://developer.constantcontact.com/docs/contacts-api/contacts-resource.html?method=PUT

    client.contacts.post(contact, true, function (err, res) {
        if (err) { throw err; }
        console.log(res);
    });

### Update existing contact
Modify a particular contact.

    client.contacts.put(contact, true, function (err, res) {
        if (err) { throw err; }
        console.log(res);
    });


## Constant Contact API documentation

* https://constantcontact.mashery.com/io-docs
* http://developer.constantcontact.com/docs/developer-guides/api-documentation-index.html
