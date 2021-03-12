
const connectionString = require('../config/mogoConfig',{useNewUrlParser: true, useUnifiedTopology: true});
const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const config = require('../config/PaymenttConfig');

mongoose.connect(connectionString)
  .then(()=> {
 
    console.clear();
    console.log(config);
    console.log('Connected to MongoDB..');})
  .catch((err)=> console.log(err));
  
module.exports = { mongoose, AutoIncrement} ;




