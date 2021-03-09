
const db = require('../DAL/Connection');

const reviewSchema = new db.mongoose.Schema(
  {
    name    : { type: String, required: true },
    rating  : { type: Number, default: 0 },
    comment : { type: String, required: true },
    date    : {type: Date, default: Date.now()}
  },
  {
    timestamps: false,
  }
);

const productSchema = new db.mongoose.Schema({
    SKU       : String,
    Title     : String,
    Description: String,
    stock     : Number,
    minStockAlert : {type : Number, default : 0},
    imageURL  : String,
    VideoURL  : String,
    Brand     : String,
    Weight    : Number,
    Dimension : {length:  Number, width : Number, height  : Number},
    Sales     : { type: Number, default : 0 },
    Rate      : { type: Number, default : 0,},
    Discount  : { type: Number, default : 0,},
    Ratings   : { type: Number, default : 0,},
    parentCategory_ID : Number,
    SubCategory1_ID   : Number,
    SubCategory2_ID   : Number,
    productSpec : [{ name : String, unit  :  String, value : Number, 'type' : String, }],
    tags      : [String],
    reviews   : [reviewSchema],
});
productSchema.plugin(db.AutoIncrement, {inc_field : 'productID'});

module.exports  = db.mongoose.model('Product', productSchema);