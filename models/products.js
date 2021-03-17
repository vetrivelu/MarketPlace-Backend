
const db = require('../DAL/Connection');

const specSchema = new db.mongoose.Schema(
  {
    name  : String,
    unit  : String,
    value : String,
    "type": String
  },
  {
    timestamps: false,
  }
);

const reviewSchema = new db.mongoose.Schema(
  {
    clientID  : { type: Number, required: true},
    name    : { type: String, required: true },
    rating  : { type: Number, default: 0 },
    comment : { type: String, required: true },
    date    : { type: Date, default: Date.now()}
  },
  {
    timestamps: false,
  }
);

const productSchema = new db.mongoose.Schema({
    sku         : String,
    title       : String,
    description : String,
    stock       : Number, 
    minStockAlert : {type : Number, default : 0},
    imageURL  : String,
    videoURL  : String,
    brand    : String,
    weight    : Number,
    dimension : { length:  Number, width : Number, height  : Number },
    sales     : { type: Number, default : 0 },
    rate      : { type: Number, default : 0,},
    discount  : { type: Number, default : 0,},
    ratings   : { type: Number, default : 0,},
    parentCategory      : Number,
    childCategory       : Number,
    grandchildCategory  : Number,
    productSpec : [specSchema],
    tags      : [String],
    reviews   : [reviewSchema],
});

productSchema.plugin(db.AutoIncrement, {inc_field : 'productID'});
module.exports  = db.mongoose.model('Product', productSchema);
