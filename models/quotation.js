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
  contractor_id : { type: Number },
  contractor_name :   String,
  po_amount   :   Number,
  po_issued_date  :   Date,
  work_commence   :   Date,
  work_complete   :   Date,
  contractorInvoice   :   [contractorInvoiceSchema],
},{ _id : false });


const quoteSchema = new db.mongoose.Schema({
  parent_quote    :   String,
  quotation_no  : {type :String, required : true},
  currency  : String,
  client_id : { type: Number },
  client_name   :   String,
  quote_amt  : {type :Number },
  client_PO  : { type  : String},
  Description : {type :String},
  quoteApproval      : {
    type  : String,
    enum  : ['REJECTED','PENDING', 'APPROVED', 'CANCELLED'],
  },
  issuedDate    : Date,
  client_invoice    :   {type : [clientinvoiceSchema], sparse :true},
  contractor_po     :   {type : [contractorPOSchema], sparse :true},
  ccmTicketNUmber : String,
  jobCompleteDate : Date,
  margin_percent  : Number,
  margin_amt  : Number
});



module.exports  = db.mongoose.model('Quote', quoteSchema);




