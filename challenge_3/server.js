/*-----------constants------------*/
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');

// MongoDB
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost/27017';
const dbName = 'userData';

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

app.post('/submit', (req, res) => {


});

/*-----------initializing------------*/

app.listen(port, () => console.log('Listening on port 3000'));