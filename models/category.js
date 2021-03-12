const db = require('../DAL/Connection');

const parentCategorySchema = db.mongoose.Schema({
    name: { type: String, required: true },
});

const childCategorySchema = db.mongoose.Schema({
    name: { type: String, required: true },
    parent:  { type: db.mongoose.Schema.Types.ObjectId, ref: 'parentCategory'},
});

const grandChildCategorySchema = db.mongoose.Schema({
    name: { type: String, required: true },
    parent:  { type: db.mongoose.Schema.Types.ObjectId, ref: 'childCategory'},
});

parentCategory      = db.mongoose.model('parentCategory', parentCategorySchema);
childCategory       = db.mongoose.model('childCategory', childCategorySchema);
grandChildCategory  = db.mongoose.model('grandChildCategory', grandChildCategorySchema);

module.exports = 
{
    parentCategory      :   parentCategory,
    childCategory       :   childCategory,
    grandChildCategory  :   grandChildCategory,
}
