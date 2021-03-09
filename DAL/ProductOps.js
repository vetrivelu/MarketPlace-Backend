const Product = require('../models/products');

async function addProduct(params)
{
    const product = new Product({
      SKU       : params.SKU,
      Title     : params.Title,
      Description: params.Description,
      imageURL  : params.imageURL,
      VideoURL  : params.VideoURL,
      Brand     : params.Brand,
      Weight    : params.Weight,
      Dimension : params.Dimension,
      Sales     : params.Sales,
      Rate      : params.Rate,
      Discount  : params.Discount,
      Ratings   : params.Ratings,
      parentCategory_ID : params.parentCategory_ID,
      SubCategory1_ID   : params.SubCategory1_ID,
      SubCategory2_ID   : params.SubCategory2_ID,
      productSpec : params.productSpec
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

async function updateProduct(id, params)
{
  const productId = id;
  const product = await Product.findById(productId);
  if(product)
  {
    product.SKU         = params.SKU;
    product.Title       = params.Title;
    product.Description = params.Description;
    product.imageURL    = params.imageURL;
    product.stock       = params.stock;
    product.VideoURL    = params.VideoURL;
    product.Brand       = params.Brand;
    product.Weight      = params.Weight;
    product.Dimension   = params.Dimension;
    product.Sales       = params.Sales;
    product.Rate        = params.Rate;
    product.Discount    = params.Discount;
    product.Ratings     = params.Ratings;
    product.minStockAlert     = params.minStockAlert;
    product.parentCategory_ID = params.parentCategory_ID;
    product.SubCategory1_ID   = params.SubCategory1_ID;
    product.SubCategory2_ID   = params.SubCategory2_ID;
    product.productSpec       = params.productSpec;
    product.reviews           = params.reviews;
  }
  const updatedProduct = await product.save().catch((err)=>{
    return err;
  });
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
