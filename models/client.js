
const db = require('../DAL/Connection');

const clientSchema = new db.mongoose.Schema ({
  name  : {type :String, required : true},
  phoneNumber : {type :String, required : true},
  email : { 
    type: String, 
    unique: true,
    required: true,
    match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
  },
  password          : {type :String, required : true},
  storeName         : {type :String, required : true},
  corporateAddress  : {type :String, required : true},
  walletAmount      : {type : Number, default: 0},
  createdDate       : {type: Date, default : Date.now()},
  proofType   : String,
  proof       : {
    data      : {type : Buffer, default : null },
    name      : {type : String, default : null },
    encoding  : {type : String, default : null },
    type      : {type : String, default : null },
  },
  totalOrder  : {type : Number, default: 0},
  totalSales  : {type : Number, default: 0},
  isApproved  : Boolean,
  isAdmin     : { type  : Boolean, default  : false },
});  

clientSchema.plugin(db.AutoIncrement, {inc_field  : 'clientID'});

module.exports = db.mongoose.model('Client', clientSchema);