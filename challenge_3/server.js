/*-----------constants------------*/
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

/*-----------middleware------------*/

app.use(express.static('public'));

/*-----------routing--------------*/

/*-----------initializing------------*/

app.listen(port, ()=> console.log('Listening on port 3000'));