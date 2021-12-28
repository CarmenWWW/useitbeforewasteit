const express = require('express');
const path = require('path');
const server = express();
const jsonServer = require('json-server');

server.use(express.static(path.resolve(__dirname, '../build')));

server.use('/api', jsonServer.router('db.json'));

server.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../build', 'index.html'));
});

server.listen(process.env.PORT || 3000);
