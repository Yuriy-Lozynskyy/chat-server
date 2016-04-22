/**
 * Created by Yuriy on 14.04.2016.


 /const http = require('http');
 const url = require('url');

 const hostname = '127.0.0.1';
 const port = 80;

 const server = http.createServer(function (req, res) {
    const queryData = url.parse(req.url, true).query;
    res.writeHead(200, {"Content-Type": "text/plain"});

    if (queryData.message) {
        res.end('Here is message ' + queryData.message + '\n');

    } else {
        res.end('Shit nothing inside message\n');
    }
});

 server.listen(port, hostname, function () {
    console.log(`Server running at http://${hostname}:${port}/`)
});
 */

var express = require('express');
var bodyParser = require('body-parser');
var fs = require('extfs');
var fs = require('fs');
const url = require('url');
var app = express();

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:2999');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.use(bodyParser.json());

app.get('/', function (req, res) {

    //TODO: READ FILE CONTENTS
    //TODO: PARSE JSON
    //TODO: SENT RESPONSE WITH CONTENT

    const queryData = url.parse(req.url, true).query;

    fs.readFile("writeFile.txt", {encoding: "utf-8"}, function read(err, data) {
        if (err) throw err;
        var content = (data) ? data : {};

        if (err || !Object.keys(content).length) {

            res.status(200).json({messages:[{"text": "Nobody started chat. You will be first!"}]});

        } else {

            content = JSON.parse(content);
            res.status(200).json({messages: content.messages});
        }
    })
});

    app.post('/', function (req, res) {

        fs.readFile("writeFile.txt", {encoding: "utf-8"}, function read(err, data) {
            if (err) throw err;
            var content = (data) ? data : {};

            if (err || !Object.keys(content).length) {
                content.messages = [];
                content.messages.push(req.body);
            } else {
                content = JSON.parse(content);
                content.messages.push(req.body);
            }
            fs.writeFile("writeFile.txt", JSON.stringify({messages: content.messages}), function (err) {
                if (err) {
                    return console.log(err);
                }
                res.status(200).json(req.body);
            })
        });
    });

    app.listen(3000, function () {
        console.log('Приклад застосунку, який прослуховує 3000-ий порт!');
    })


