/*-----------constants------------*/
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');

// MongoDB
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost/27017';
const dbName = 'userData';
var ObjectID = require('mongodb').ObjectID;

/*-----------middleware------------*/

app.use(express.static('./public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/*-----------db connection--------------*/

let db;

MongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
  if (err) return console.log(err);

  db = client.db(dbName);
  console.log(`Connected to MongoDB: ${url}`);
  console.log(`Accessing database: ${dbName}`);
})
/*-----------routing--------------*/
app.post('/checkout', (req, res) => {
  let infoChunk = req.body;
  
  // inserts into database with unique ID 
  db.collection('userData').insertOne(infoChunk, function (err, data) {
    if (err) {
      res.send('Error: ', err);
    } else {
      res.status(201).send(data.insertedId);
    }
  });

});

app.post('/submit', (req, res) => {
  let infoChunk = req.body;
  // find the db row that matches userID set on client side 
  var filter = {_id: ObjectID(infoChunk.userID)};
  var update = { 
    $set: 
    {
      name: infoChunk.name,
      email: infoChunk.email,
      password: infoChunk.password,
      line1: infoChunk.line1,
      line2: infoChunk.line2,
      city: infoChunk.city,
      state: infoChunk.state,
      zip: infoChunk.zip,
      phoneNum: infoChunk.phoneNum,
      ccNum: infoChunk.ccNum,
      exp: infoChunk.exp,
      cvv: infoChunk.cvv,
      zipCode: infoChunk.zipCode,
      userID: infoChunk.userID
    }
  };
  var options = {'upsert': true};
  db.collection('userData').updateOne(filter, update, options, function (err) {
    if (err) {
      res.send('Error: ', err);
    } else {
      res.status(201).send('Added updated data to db...');
    }
  });
      // db.collection('userData').update({}, {$unset: {userID: infoChunk.userID}});


      // if we find a match with our current info's name, only update address and CC info


});

/*-----------initializing------------*/

app.listen(port, () => console.log('Listening on port 3000'));