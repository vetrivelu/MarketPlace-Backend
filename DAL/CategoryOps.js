
async function addParentCategory(cat)
{
    let catObject = { Name  :   cat.Name}
    cat = await ParentCategory.create(catObject).catch((error)=>{
        let err = {
            code    :   error.parent.code,
            message :   error.message,
        }
        console.log(error.errors);
        return err;
    })
    return cat;
}

async function addSubCategory1 (cat)
{
    var catObject = {
        Name    :   cat.Name,
        parentCategory_ID   :   cat.parentCategory_ID,
    }
    cat = await subcategory1.create(catObject).catch((error)=>{
        let err = {
            code    :   error.parent.code,
            message :   error.message,
        }
        console.log(error.errors);
        return err;
        })
    return cat;
}

async function addSubCategory2(cat)
{
    let catObject = {
        Name    :   cat.Name,
        SubCategory1_ID :   cat.SubCategory1_ID,
        ParentCategory_ID   :   cat.ParentCategory_ID,
    }
    cat = await subcategory2.create(catObject).catch((error)=>{
        let err = {
            code    :   error.parent.code,
            message :   error.message,
        }
        console.log(error.errors);
        return err;
})
return cat;

}

async function getParentCategory(id)
{
    var cat;
    if(id){
        cat = await ParentCategory.findByPk(id);
    } else{
        cat = await ParentCategory.findAll();
    }
//----------------------------------------------
    if(cat === null) {
        console.log("No such Category");
    } else {
        return cat;
    }
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


module.exports.addParentCategory    = addParentCategory;
module.exports.addSubCategory1      = addSubCategory1;
module.exports.addSubCategory2      = addSubCategory2;
module.exports.getParentCategory      = getParentCategory;
module.exports.getChildCategory      = getChildCategory;
module.exports.getGrandChildCategory      = getGrandChildCategory;
