const Category = require('../models/category');
const Parent    =   Category.parentCategory;
const Child     =   Category.childCategory;
const GrandChild=   Category.childCategory;

async function addParentCategory(params)
{
    const category = new Parent({
        name    :   params.name,
    });
    const new_category = category.save();
    if(new_category){
        return new_category;
    }
    return "error";
}

async function addChildCategory (params)
{
    const category = new Child({
        name    :   params.name,
        parent  :   params.parent,
    });
    const new_category = category.save();
    if(new_category){
        return new_category;
    }
    return "error";
}

async function addGrandChildCategory(params)
{
    const category = new GrandChild({
        name    :   params.name,
        parent  :   params.parent,
    });
    const new_category = category.save();
    if(new_category){
        return new_category;
    }
    return "error";
}

async function getParentCategory(id)
{
    const ParentCategories = await Parent.find({}).catch((err)=>
    {
        return err;
    })
    return ParentCategories;
}

async function getChildCategory(id)
{
    var cat = await subcategory1.findAll({where:  {parentCategory_ID  :   id}   });
//----------------------------------------------
    if(cat === null) {
        console.log("No such Parent Category");
    } else {
        return cat;
    }
}


async function getGrandChildCategory(id)
{
    var cat = await subcategory2.findAll({where:  {SubCategory1_ID  :   id}   });
//----------------------------------------------
    if(cat === null) {
        console.log("No such Parent Category");
    } else {
        return cat;
    }
}


module.exports.addParentCategory     = addParentCategory;
module.exports.addChildCategory      = addChildCategory;
module.exports.addGrandChildCategory = addGrandChildCategory;
module.exports.getParentCategory     = getParentCategory;
module.exports.getChildCategory      = getChildCategory;
module.exports.getGrandChildCategory = getGrandChildCategory;

