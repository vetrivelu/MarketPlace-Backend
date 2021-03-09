const db = require('../DAL/Connection');

const adminSchema = new db.mongoose.Schema({
  _id : Number,
  name  : String,
  Email: { 
    type: String, 
    unique: true,
    required: true,
    match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
  },
  Password  : String,
  isActiveSubscription  : { type  : Boolean, default  : false },
  phoneNumber : String,
  Address : String,
  StartDate : Date,
  EndDate : Date,
  isAdmin : { type  : Boolean, default  : true },
},{_id: false})
adminSchema.plugin(db.AutoIncrement);

module.exports  = db.mongoose.model('Admin', adminSchema);

