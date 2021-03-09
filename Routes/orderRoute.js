const express = require('express');
const router = express.Router();
const Order = require('../DAL/ProductOps');
const isAdmin = require('../Midddleware/AdminMiddleware');
const isClient  =   require('../Midddleware/AuthMiddleware');

router.post('/create', async(req, res)=>{
    console.log("Endpoin hit");
    var order = await createOrder(req.body); 
    if(order.orderID)
    {
        console.log("Success");
        res.status(200).send("Order created Succesfully");
    }
    else
    {
        console.log(order);
        res.status(500).send(order);
    }

});
router.post('/cancel/:id', async(req, res)=>{
    console.log("Endpoin hit");
    var order = await cancelOrder(req.params.id); 
    if(order.orderID)
    {
        console.log("Success");
        res.status(200).send("Order created Succesfully");
    }
    else
    {
        console.log(order);
        res.status(500).send(order);
    }

});

module.exports = router;