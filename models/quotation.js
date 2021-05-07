const db = require('../DAL/Connection');

const contractorInvoiceSchema = new db.mongoose.Schema({
  invoice_no  : {type :String, default : "Dummy"},
  tax_invoice_no  : {type :String},
  contractor_id : { type: Number },
  invoice_amt  : {type :Number, },
  issuedDate : Date,
  Payment_received_dae    :   Date,
  received_amount :   Number,
  isCredit  : { type  : Boolean },
  creditNotes :   {
      creditNoteAmount    :   Number,
      creditNoteDEscription   :   String,
      creditNoteIssuedDate    :   Date
  }
},{ _id : false });


const clientinvoiceSchema = new db.mongoose.Schema({
  invoice_no  : {type :String, sparse : true, },
  client_id : { type: Number },
  invoice_amt  : {type :Number,},
  issuedDate : Date,
  Payment_received_dae    :   Date,
  received_amount :   Number,
  isCredit  : { type  : Boolean, },
  creditNotes :   {
      creditNoteAmount    :   Number,
      creditNoteDEscription   :   String,
      creditNoteIssuedDate    :   Date
  }
},{ _id : false });

const contractorPOSchema = new db.mongoose.Schema({
  quotation_no  : String,
  contractor_id : { type: Number },
  contractor_name :   String,
  po_amount   :   Number,
  po_issued_date  :   Date,
  work_commence   :   Date,
  work_complete   :   Date,
  contractorInvoice   :   [contractorInvoiceSchema],
},{ _id : false });

const quoteSchema = new db.mongoose.Schema({
  quotation_no  : {type :String, required : true},
  contractor_po     :   {type : [contractorPOSchema], sparse :true},
});

module.exports  = db.mongoose.model('Quote', quoteSchema);

