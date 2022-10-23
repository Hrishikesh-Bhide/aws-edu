var AWS = require("aws-sdk");
let awsConfig = {
    "region": "us-east-2",
    "endpoint": "http://dynamodb.us-east-2.amazonaws.com",
    "accessKeyId": "AKIAUOGEXETFCIM2NIXO", "secretAccessKey": "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"
};
AWS.config.update(awsConfig);

let docClient = new AWS.DynamoDB.DocumentClient();

let save = function () {

    var input = {
        "Username": "Shivanjali", "Password": "Ransingh", "Score": 0
    };
    var params = {
        TableName: "Users",
        Item:  input
    };
    docClient.put(params, function (err, data) {

        if (err) {
            console.log("users::save::error - " + JSON.stringify(err, null, 2));                      
        } else {
            console.log("users::save::success" );                      
        }
    });
}

save();
