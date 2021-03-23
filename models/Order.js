
const db = require('../DAL/Connection');

const shippingSchema = {
    address: { type: String, required: true },
    city: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true },
  };
  
  const paymentSchema = {
    paymentMethod: { type: String, required: true }
  };
  
  const orderItemSchema = new db.mongoose.Schema({
    product: {
      type: db.mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    price: { type: String, required: true },
    qty : {type : Number, default : 1}
  });

  const negotiationSchema = new db.mongoose.Schema({
    bid : { type: Number},
    message :   String,
  });
  
  const orderSchema = new db.mongoose.Schema({
    client: { type: db.mongoose.Schema.Types.ObjectId, ref: 'Clients', required: true },
    orderItems  : [orderItemSchema],
    shipping    : shippingSchema,
    negotiation : negotiationSchema,
    status      : {
      type  : String,
      enum  : ['PENDING APPROVAL','PENDING PAYMENT', 'APPROVED', 'CANCELLED'],
      default : 'PENDING APPROVAL',
    },
    taxPrice    : { type: Number, default : 0},
    shippingPrice   : { type: Number, default : 0 },
    totalPrice  : { type: Number, default : 0 },
    isPaid      : { type: Boolean, default: false },
    paidOn      : { type: Date },
    isDelivered : { type: Boolean, default: false },
    deliveredOn : { type: Date },
    tracking_id : String,
    razorpay_payment_id : String,
    razorpay_order_id   : String,
    razorpay_signature  : String
  }, {
      timestamps: true
  });

orderSchema.plugin(db.AutoIncrement, {inc_field : 'orderID'});

module.exports  = db.mongoose.model('Orders', orderSchema);