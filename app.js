const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const key=require('./config/keys')

app.use(cors(key.corsOpts))
require('./models/index')
key.adminCheck()
require('./routes/index')(app)

mongoose.connect(`mongodb://localhost:27017/${key.dbName}`);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  app.listen(key.port)
  console.log(`listening to port: ${key.port}`)
});