const db = require('../DAL/Connection');

const parentCategorySchema = db.mongoose.Schema({
    name: { type: String, required: true },
});

const childCategorySchema = db.mongoose.Schema({
    name: { type: String, required: true },
    parent:  { type: db.mongoose.Schema.Types.ObjectId, ref: 'parentCategory'},
});

const grandChildCategory = db.mongoose.Schema({
    name: { type: String, required: true },
    parent:  { type: db.mongoose.Schema.Types.ObjectId, ref: 'childCategory'},
});

parentCategory      = db.mongoose.model('parentCategory', categorySchema);
childCategory       = db.mongoose.model('childCategory', categorySchema);
grandChildCategory  = db.mongoose.model('grandChildCategory', categorySchema);

module.exports = 
{
    parentCategory      :   parentCategory,
    childCategory       :   childCategory,
    grandChildCategory  :   grandChildCategory,
}
