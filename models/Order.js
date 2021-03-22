
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
    name: { type: String, required: true },
    qty:    { type: Number, required: true },
    image: { type: String, required: true },
    price: { type: String, required: true },
    product: {
      type: db.mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
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
    itemsPrice  : { type: Number },
    taxPrice    : { type: Number },
    shippingPrice   : { type: Number },
    totalPrice  : { type: Number },
    isPaid      : { type: Boolean, default: false },
    paidOn      : { type: Date },
    isDelivered : { type: Boolean, default: false },
    deliveredOn : { type: Date },
    razorpay_payment_id : String,
    razorpay_order_id   : String,
    razorpay_signature  : String
  }, {
      timestamps: true
  });

orderSchema.plugin(db.AutoIncrement, {inc_field : 'orderID'});

module.exports  = db.mongoose.model('Orders', orderSchema);