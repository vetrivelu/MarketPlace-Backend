const db = require('../DAL/Connection');

const adminSchema = new db.mongoose.Schema({
  name  : {type :String, required : true},
  email : { 
    type: String, 
    unique  : true,
    required: true,
    match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
  },
  password  : {type :String, required : true},
  isActiveSubscription  : { type  : Boolean, default  : false },
  phoneNumber : {type :String, required : true},
  address : {type :String, required : true},
  startDate : Date,
  endDate : Date,
  isAdmin : { type  : Boolean, default  : true },
},{_id: false});
adminSchema.plugin(db.AutoIncrement);

module.exports  = db.mongoose.model('Admin', adminSchema);

