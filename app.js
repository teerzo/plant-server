

// eslint-disable-next-line import/no-unresolved
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();


const { routePlants } = require('./src/routes/plants.js');
// const { routeUsers } = require('./src/routes/users.js');

const app = express();
app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());

// ROUTES
app.use('/plants', routePlants);
// app.use('/users', routeUsers);


if (process.env.MONGO_URI) {
  console.log('found mongodb uri');
  const query = '';
  // const query = '?authSource=admin&replicaSet=atlas-6bavsy-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true';
  const CONNECTION_URL = `${process.env.MONGO_URI}${query}`;
  const PORT = process.env.PORT || 5000;

  mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
    .catch((error) => console.log(`${error} did not connect`));

  mongoose.set('useFindAndModify', false);
}
else {
  console.log('failed to connect');
  console.log('env', process.env);
  // res.status(500).json({ message: 'failed to connect to database'});
}

module.exports = app;


// const secret = 'teerzo:fbQmlXaygW0DkjP3@plantsandshit.4qj8y.mongodb.net/plants';
