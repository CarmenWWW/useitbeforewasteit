const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');
const jsonServer = require('json-server');

const router = jsonServer.router('db.json');

const env = process.env.NODE_ENV || 'development';

if (env === 'development') {
  app.use(cors());
  app.use('/api', router);
  app.listen(process.env.PORT || 3001);
} else {
  app.use('/api', router);
  app.use(express.static(path.resolve(__dirname, '../build')));
  app.get('*', (_, res) => {
    res.sendFile(path.resolve(__dirname, '../build', 'index.html'));
  });

  app.listen(process.env.PORT || 3000);
}
