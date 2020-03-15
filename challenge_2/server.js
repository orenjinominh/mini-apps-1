const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');

app.use(bodyParser);
app.use(express.static('client'));


app.listen(port, () => console.log('Listening on port 3000...'));

