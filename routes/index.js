var express = require('express');
var router = express.Router();
var path = require("path");

process.env.NODE_ENV = 'production ';

router.get('/', function (req, res, next) {
  res.send({
    status: 200,
    data: {
      message: "Welcome to pyComm api"
    }
  });
});

router.get('/pyComm', function (req, res, next) {

  var dataString = '',
    spawn = require('child_process').spawn,
    pyFile = path.join(__dirname, "./main.py"),
    data = [1,2,3,4,5,6,7,8,9],
    py = spawn('python', [pyFile], {
      env: Object.create(process.env)
    });

  py.stdin.write(JSON.stringify(data));

  py.stdout.on('data', function (data) {
    dataString += data.toString();
  });

  py.stdout.on('end', function () {
    res.send({
      status: 200,
      data: dataString.replace(/\r?\n|\r/g, '')
    });
  });
  py.stdin.end();

});

module.exports = router;