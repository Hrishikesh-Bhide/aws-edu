var AWS = require("aws-sdk");
let awsConfig = {
    "region": "us-east-2",
    "endpoint": "http://dynamodb.us-east-2.amazonaws.com",
    "accessKeyId": "AKIAUOGEXETFCIM2NIXO", "secretAccessKey": "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"
};
AWS.config.update(awsConfig);

let docClient = new AWS.DynamoDB.DocumentClient();

let scan = function () {
    var params = {
        TableName: "Users",
    }
    let response = docClient.scan(params, function (err, data) {
        if (err) {
            console.log("users::Scan::error - " + JSON.stringify(err, null, 2));
        }
        else {
            console.log("users::Scan::success - " + JSON.stringify(data, null, 2));
        }
    });
    return response;
};


let fetchOneByKey = function () {
    var params = {
        TableName: "Users",
	Key: {
            "Username": "Hrishikesh"
        }        
    };
    docClient.get(params, function (err, data) {
        if (err) {
            console.log("users::fetchOneByKey::error - " + JSON.stringify(err, null, 2));
        }
        else {
            console.log("users::fetchOneByKey::success - " + JSON.stringify(data, null, 2));
        }
    })
}

scan();
fetchOneByKey();
