/*-------------constants------------*/

const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
/*------------middleware------------*/
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(express.static('client'));
/*------------helper functions------------*/
// needs function to convert text area into csv
// keys of objects will be columns of report
// object has children, some may be empty


/*------------routing------------*/
// if <form> has method and action, when submit clicked
// browser will submit form data to server at url no AJAX needed (POST method)
// response is CSV report with form (so user doesn't leave page)

// 1- upon post to text area 
app.post('/upload', (req, res) => {
  console.log('post requested to /upload here --->', req.body); // this is just object in string 
  res.send('got your json text boday!'); // 2- this will send back the report and form 
});






/*------------initializing------------*/
app.listen(port, () => console.log('Listening on port 3000...'));

