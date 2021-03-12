const { findOneAndUpdate } = require('../models/products');
const Product = require('../models/products');

async function addProduct(params)
{
    const product = new Product({
    sku                 : params.sku,
    title               : params.title,
    description         : params.description,
    stock               : params.stock,
    minStockAlert       : params.minStockAlert,
    imageURL            : params.imageURL,
    videoURL            : params.videoURL,
    brand               : params.brand,
    weight              : params.weight,
    dimension           : params.dimension,
    rate                : params.rate,
    discount            : params.discount,
    parentCategory      : params.parentCategory,
    childCategory       : params.childCategory,
    grandchildCategory  : params.grandchildCategory,
    productSpec         : params.productSpec,
    tags                : params.tags
    });
    const newProduct = await product.save().catch((err) =>{
        return err;
    });
    return newProduct;    
}

async function deleteProduct(productID){
 product =  await Product.findByIdAndDelete(productID).catch((err)=>
  {
    return err;
  });
  return product;
}

async function review(id, params)
{
  const product = await Product.findById(id);
    if (product) {
      const review = {
        clientID : params.clientID,
        name: params.name,
        rating: Number(params.rating),
        comment: params.comment,
      };
      product.reviews.push(review);
      product.numReviews = product.reviews.length;
      product.rating =
        product.reviews.reduce((a, c) => c.rating + a, 0) /
        product.reviews.length;
      const updatedProduct = await product.save();
      return updatedProduct;
    }
}

async function deleteProduct(id)
{
  const deletedProduct = await Product.findById(id).catch((err)=>{
    return err;
  })
  if(deleteProduct)
  {
    return deletedProduct;
  }
}

async function updateProduct(update, id)
{
  let updatedProduct  = await Product.findByIdAndUpdate(id, update);
  if(updatedProduct)
  {
    return updatedProduct; 
  }
}


module.exports.addProduct     = addProduct;
module.exports.deleteProduct  = deleteProduct;
module.exports.review         = review;
module.exports.deleteProduct  = deleteProduct;
module.exports.updateProduct  = updateProduct;

//getProduct/0, getProdcut/7, 
