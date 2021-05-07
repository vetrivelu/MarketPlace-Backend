
const connectionString = require('../config/mogoConfig',{useNewUrlParser: true, useUnifiedTopology: true});
const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const config = require('../config/PaymenttConfig');
const localtunnel = require('localtunnel');
mongoose.connect(connectionString)
  .then(()=> {
    console.clear();
    console.log('Connected to MongoDB..');})
  .catch((err)=> console.log(err));




  
module.exports = { mongoose, AutoIncrement} ;



