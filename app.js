// eslint-disable-next-line import/no-unresolved
const serverless = require('serverless-http');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();

// Routes
const { routePlants } = require('./src/routes/plants.js');
// const { routeUsers } = require('./src/routes/users.js');

const app = express();
app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// Routes
app.use('/plants', routePlants);
// app.use('/users', routeUsers);

if (process.env.STAGE === 'staging') {
  // lazy local server to run locally, look into serverless offline to replace this 
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`));
}

module.exports = app;
// module.exports = serverless(app, {
//   request: function (req, event, context) {
//     context.callbackWaitsForEmptyEventLoop = false;
//     req.event = event;
//     req.context = context;
//   },
// });