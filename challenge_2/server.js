/*-------------constants------------*/
const express = require('express');
const path = require('path');
const fileUpload = require('express-fileupload');
const app = express();
const port = process.env.PORT || 3000;


/*------------middleware------------*/
app.use(express.static(path.join(__dirname, './client')));
app.use(fileUpload());

/*------------helper functions------------*/
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
app.post('/upload', (req, res) => {
  var fileData = req.files.file.data.toString('utf8');
  fileData = fileData.replace(/;/g, " ");
  var csvReport = convertJSONToCSV(JSON.parse(fileData));
  res.send(`<div>${csvReport}</div>`); 
});

/*------------initializing------------*/
app.listen(port, () => console.log('Listening on port 3000...'));

