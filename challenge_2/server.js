/*-------------constants------------*/

const express = require('express');
// const multer = require('multer');
const path = require('path');
// const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
// const fs = require('fs');
const app = express();
const port = 3000;


/*------------middleware------------*/
app.use(express.static('client'));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true })); 
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
  console.log('uploaded file here ', req.files);

  if (!req.files) {
    return res.status(400).send('No files uploaded :(');
  }

  let uploadedFileContent = req.files.uploadedFile.data.toString('utf8');
  console.log('uploaded file body here--->', uploadedFileContent);
  uploadedFileContent = uploadedFileContent.replace(/;/g, " ");
  let csvData = convertJSONToCSV(JSON.parse(uploadedFileContent));
  res.send(`<body> <div class="generator" align="center"> <h1>CSV Report Generator</h1> <form action="/upload" method="POST" name="upload" enctype="multipart/form-data"> <input type="file" name="uploadedFile"> <br><input type="submit" value="Submit"> </form> </div><div align="center">${csvData}</div></body>`);


  // pre-refactor: text area submission
  // var data = JSON.parse(req.files); 
  // data = data.replace(/;/g, ' '); // c&p from sample file is baaad, must remove ; at the end
  // console.log('post requested to /upload here --->', req.files.uploadedFile); // this is an object 
  // csvData =  convertJSONToCSV(JSON.parse(data));
  // res.send('file uploaded!');
  // res.send(`<body> <div class="generator" align="center"> <h1>CSV Report Generator</h1> <form action="/upload" method="POST" name="upload"> <textarea name="jsontext" cols="50" rows="30"></textarea> <br><input type="submit" value="Submit"> </form> <div>${csvData}</div> </div><script src='../server.js'></script></body>`); // 2- this will send back the report and form 
});


/*------------initializing------------*/
app.listen(port, () => console.log('Listening on port 3000...'));

