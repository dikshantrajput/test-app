const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();
const Gun = require('gun/gun')

const app = express();

app.use(Gun.serve);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(pino);

app.get('/api/greeting', (req, res) => {
  const name = req.query.name || 'World';
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({ greeting: `Hello ${name}!` }));
});

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () =>
  console.log('Express server is running on localhost:3001')
);

console.log(server)

Gun({ file: 'db', web: server });