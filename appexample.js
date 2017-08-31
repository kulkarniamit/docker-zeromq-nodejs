const express = require('express')
const app = express()
var zmq = require('zeromq');
var uuidv4 = require('uuid/v4');

// socket to talk to server
var requester = zmq.socket('req');
var responses = {};
requester.connect(process.env.PYTHONSERVICE_PORT_5000_TCP);

requester.on("message", function(data) {
    console.log("Received reply");
    var data = JSON.parse(data);
    var msgId = data.id;
    var res = responses[msgId];
    res.send(data.message);
    responses[msgId] = null;
});

app.get('/', function (req, res) {
    console.log("Sending request...");
    var msgId = uuidv4();
    var data = { id: msgId, message: 'Request to send some amazing data...'};
    responses[msgId] = res;
    requester.send(JSON.stringify(data));
})

app.listen(80, function () {
  console.log('Example app listening on port 80')
})

process.on('SIGINT', function() {
  requester.close();
});
