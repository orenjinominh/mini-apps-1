/*-----------constants------------*/
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');

/*-----------middleware------------*/

app.use(express.static('public'));
app.use(bodyParser());

/*-----------routing--------------*/


/*-----------initializing------------*/

app.listen(port, () => console.log('Listening on port 3000'));