const express = require('express');
const router = express.Router();
const Quotation = require('../DAL/Quotationops');

router.post('/addQuote', async(req, res)=>{
    console.log("Endpoin hit");
    var quotation = await Quotation.addQuotation(req.body);
    if(quotation)
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
    if(quotation)
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
    if(quotation)
    {
        console.log("Product Registered");
        res.status(200).send(quotation);
    }
    else
    {
        res.status(500).send(quotation);
    }
});

router.get('/getQuoteNumber/:id', async(req, res)=>{
    console.log("Endpoin hit");
    var quotation = await Quotation.getQuotationByNumber(req.params.id);
    if(quotation)
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
    if(quotation)
    {
        console.log("Product Registered");
        res.status(200).send(quotation);
    }
    else
    {
        res.status(500).send(quotation);
    }
});

router.delete('/deleteQuote/:id', async(req, res)=>{
    console.log("Endpoin hit");
    var quotation = await Quotation.deleteQuotation(req.params.id);
    if(quotation)
    {
        console.log("Product Registered");
        res.status(200).send(quotation);
    }
    else
    {
        res.status(500).send(quotation);
    }
});

router.get('/getclientInvoices', async(req, res)=>{
    console.log("Endpoin hit");
    var invoices = await Quotation.getApprovedClientInvoices();
    if(invoices)
    {
        res.status(200).send(invoices);
    }
    else
    {
        res.status(500).send(invoices);
    }
});

router.get('/getcontractorInvoices', async(req, res)=>{
    console.log("Endpoin hit");
    var invoices = await Quotation.getApprovedContractorInvoices();
    if(invoices)
    {
        res.status(200).send(invoices);
    }
    else
    {
        res.status(500).send(invoices);
    }
});


module.exports = router;

