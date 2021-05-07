const express = require('express');
const router = express.Router();
const Quotation = require('../DAL/Quotationops');


router.post('/addQuote', async(req, res)=>{
    console.log("Endpoin hit");
    var quotation = await Quotation.addQuotation(req.body);
    if(quotation._id)
    {
        console.log("Product Registered");
        res.status(200).send(quotation);
    }
    else
    {
        res.status(500).send(quotation);
    }
});

router.post('/updateQuote/:id', async(req, res)=>{
    console.log("Endpoin hit");
    var quotation = await Quotation.updateQuotation(req.params.id, req.body);
    if(quotation._id)
    {
        console.log("Product Registered");
        res.status(200).send(quotation);
    }
    else
    {
        res.status(500).send(quotation);
    }
});

router.get('/getQuote/:id', async(req, res)=>{
    console.log("Endpoin hit");
    var quotation = await Quotation.getQuotation(req.params.id);
    if(quotation._id)
    {
        console.log("Product Registered");
        res.status(200).send(quotation);
    }
    else
    {
        res.status(500).send(quotation);
    }
});

router.get('/getQuote', async(req, res)=>{
    console.log("Endpoin hit");
    var quotation = await Quotation.getQuotation();
    if(quotation._id)
    {
        console.log("Product Registered");
        res.status(200).send(quotation);
    }
    else
    {
        res.status(500).send(quotation);
    }
});

module.exports = router;

