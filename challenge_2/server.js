/*-------------constants------------*/

const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
/*------------middleware------------*/
// app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(express.static('client'));
/*------------helper functions------------*/
// needs function to convert text area into csv
// keys of objects will be columns of report
// object has children, some may be empty

var getHeaders = function(data) {
  let keys = Object.keys(data);
  keys.pop();
  return keys.join(' ') + '\n';
}

var convertJSONToCSV = function(data) { 
  var csvResults = getHeaders(data) + '<br>';
  // now we need to get values of all objects using recursion
  var getValues = function(innerData) {
    for (var key in innerData) {
      if (key !== 'children') {
        csvResults += innerData[key] + ' ';
      } 
    }

    csvResults += '<br>';

    if (innerData.children && (innerData.children.length > 0)) {
      for (var i = 0; i < innerData.children.length; i++) {
        getValues(innerData.children[i]);
      }
    }
  }

  getValues(data);
  return csvResults; 
  
}

/*------------routing------------*/
// if <form> has method and action, when submit clicked
// browser will submit form data to server at url no AJAX needed (POST method)
// response is CSV report with form (so user doesn't leave page)

// 1- upon post to text area 
app.post('/upload', (req, res) => {
  var data = req.body.jsontext;
  data = data.replace(/;/g, " "); // c&p from sample file is baaad, must remove ; at the end
  console.log('post requested to /upload here --->', data); // this is an object 
  csvData =  convertJSONToCSV(JSON.parse(data));
  res.send(`<body> <div class="generator" align="center"> <h1>CSV Report Generator</h1> <form action="/upload" method="POST" name="upload"> <textarea name="jsontext" cols="50" rows="30"></textarea> <br><input type="submit" value="Submit"> </form> <div>${csvData}</div> </div><script src='../server.js'></script></body>`); // 2- this will send back the report and form 
});






/*------------initializing------------*/
app.listen(port, () => console.log('Listening on port 3000...'));

