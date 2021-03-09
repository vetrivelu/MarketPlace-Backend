const express = require('express');
const router = express.Router();
const Product = require('../DAL/ProductOps');
const isAdmin = require('../Midddleware/AdminMiddleware');
const isClient  =   require('../Midddleware/AuthMiddleware');

router.post('/', async(req, res)=>{
    console.log("Endpoin hit");
    var product = await Product.addProduct(req.body);
    if(product._id)
    {
        console.log("Successful User Registration");
        res.status(200).send("User Registration Successfull");
    }
    else if (product == "DUPL_USER")
    {
        console.log("Duplicate user");
        res.status(409).send("Duplicate resgistration attempt");
    }
    else
    {
        res.status(500).send(product);
    }
});

router.post('/:id/reviews', async (req, res) => {
    const updatedProduct = await Product.review(req.params.id, req.body);
    if (updatedProduct) {
      res.status(201).send({
        data: updatedProduct.reviews[updatedProduct.reviews.length - 1],
        message: 'Review saved successfully.',
      });
    } else {
      res.status(404).send({ message: 'Product Not Found' });
    }
});

router.delete('/:id', async (req, res) => {
    const deletedProduct = await Product.deleteProduct(req.params.id);
    if (deletedProduct) {
      await deletedProduct.remove();
      res.send({ message: 'Product Deleted' });
    } else {
      res.send('Error in Deletion.');
    }
});

router.put('/:id', async (req, res) => {
  const updatedProduct = await Product.updateProduct(req.params.id);
  if (updatedProduct) {
    await updatedProduct.remove();
    res.send({ message: 'Product Updated' });
  } else {
    res.send('Error Updating product.');
  }
});


module.exports = router;