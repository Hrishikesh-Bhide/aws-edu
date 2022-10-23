const express = require('express')
const app = express()
const port = 3000
var AWS = require("aws-sdk");
var bodyParser = require('body-parser');
app.set('view engine', 'ejs');
var main_arr = [];
app.use(bodyParser.urlencoded({ extended: false }))
let awsConfig = {
  "region": "us-east-2",
  "endpoint": "http://dynamodb.us-east-2.amazonaws.com",
  "accessKeyId": "AKIAUOGEXETFCIM2NIXO", "secretAccessKey": "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"
};
var math_arr = [];


function sortUsers(data) {
  var arr = []
  for (var i in data.Items) {
    arr.push(data.Items[i]);
  }
  arr.sort(function (a, b) {
    return a.Score - b.Score;
  });
  return arr.reverse();
}

app.get('/', (req, res) => {
  res.render('add');
})

app.get('/Math', (req, res) => {
  res.render('mathquiz');
})

app.get('/Geo', (req, res) => {
  res.render('geoquiz');
})

app.get('/Add', (req, res) => {
  res.render('add');
});

app.get('/Home', (req, res) => {
  res.render('home');
});

app.post('/Update', (req, res) => {
  AWS.config.update(awsConfig);
  let docClient = new AWS.DynamoDB.DocumentClient();

  var input = {
    "Username": "Hrishikesh", "Password": "Bhide", "Score": req.body.fname
  };
  var params = {
    TableName: "Users",
    Item: input
  };
  docClient.put(params, function (err, data) {
    if (err) {
      console.log("Addition failed " + JSON.stringify(err, null, 2));
    } else {
      console.log("Score updated!");
    }
  });
  res.render('home');
});

app.get('/Users', (req, res) => {
  AWS.config.update(awsConfig);
  let docClient = new AWS.DynamoDB.DocumentClient();
  docClient.scan(params = { TableName: "Users" }, function (err, data) {
    if (err) {
      console.log("Failed to get data!" + JSON.stringify(err, null, 2));
    }
    else {
      main_arr = sortUsers(data);
      res.render('Users', { main_arr });
    }
  })
})

app.post('/Add2', (req, res, next) => {
  AWS.config.update(awsConfig);
  let docClient = new AWS.DynamoDB.DocumentClient();
  var input = {
    "Username": req.body.fname, "Password": req.body.lname, "Score": 0
  };
  var params = {
    TableName: "Users",
    Item: input
  };
  docClient.put(params, function (err, data) {
    if (err) {
      console.log("Addition failed " + JSON.stringify(err, null, 2));
    } else {
      console.log("User added!");
    }
  });
  res.render('home');
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
