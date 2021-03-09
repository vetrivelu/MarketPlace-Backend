
const db = require('../DAL/Connection');

const clientSchema = new db.mongoose.Schema ({
  name  : String,
  phoneNumber : String,
  Email : { 
    type: String, 
    unique: true,
    required: true,
    match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
  },
  profile: {
    name: { type: String, default: ''},
    picture: { type: String, default: ''}
  },
  password  : String,
  StoreName : String,
  CorporateAddress  : String,
  walletAmount  : {type : Number, default: 0},
  CreatedDate : {type: Date, default : Date.now()},
  ProofType : String,
  Proof : Buffer,
  TotalOrder  : {type : Number, default: 0},
  TotalSales  : {type : Number, default: 0},
  isApproved  : Boolean,
  isAdmin     : { type  : Boolean, default  : false },
},{_id: false});  
clientSchema.plugin(db.AutoIncrement, {inc_field  : 'ClientID'});

module.exports = db.mongoose.model('Client', clientSchema);