"use strict";
const http = require('http');
const path = require("path");
const spawn = require('child_process').spawn
const port = 3000

const requestHandler = (request, response) => {
    if (request.url !== 'favicon.ico') {

        var dataString = '',
            data = [1, 2, 3, 4, 5, 6, 7, 8, 9],
            py = spawn('python', ["main.py"], {
                env: Object.create(process.env)
            });

        py.stdin.write(JSON.stringify(data));

        py.stdout.on('data', function (data) {
            dataString += data.toString();
        });

        py.stdout.on('end', function () {
            response.end(JSON.stringify({
                status: 200,
                data: dataString.replace(/\r?\n|\r/g, '')
            }));
        });
        py.stdin.end();
    }
}

const server = http.createServer(requestHandler)

server.listen(port, (err) => {
    if (err)
        return console.log('something bad happened', err)

    return console.log(`server is listening on ${port}`)
})