const express = require('express')
const app = express()
const mongoose = require('mongoose')

const port = process.env.PORT||5000;
const dbName="market";

require('./models/index')
require('./routes/index')(app)

mongoose.connect(`mongodb://localhost:27017/${dbName}`);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  app.listen(port)
  console.log(`listening to port: ${port}`)
});