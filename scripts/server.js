const express = require('express');
const path = require('path');

const server = express();
const distFolder = path.normalize(`${__dirname}/../dist`);

server.use('/', express.static(distFolder));
server.get('/*', (req, res) => res.sendFile(`${distFolder}/index.html`));
server.listen(process.env.PORT || 3000);
