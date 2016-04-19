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
const url = require('url');
var app = express();

app.get('/', function (req, res) {
    const queryData = url.parse(req.url, true).query;
    res.writeHead(200, {"Content-Type": "text/plain"});

    if (queryData.message) {
        res.end('Here is message ' + queryData.message + '\n');

    } else {
        res.end('Shit nothing inside message\n');
    }
});

app.listen(80, function () {
    console.log('Приклад застосунку, який прослуховує 3000-ий порт!');
});