const express = require('express');
const path = require('path');

const server = express();
const distFolder = path.normalize(`${__dirname}/../dist`);

const serverAddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
const serverPort = process.env.OPENSHIFT_NODEJS_PORT || 8080;

server.use('/', express.static(distFolder));
server.get('/*', (req, res) => res.sendFile(`${distFolder}/index.html`));
server.listen(serverPort, serverAddress, () =>
  console.log(`Listening on ${serverAddress}:${serverPort}`)
);
