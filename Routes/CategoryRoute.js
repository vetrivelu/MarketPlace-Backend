const express = require('express');
const router = express.Router();
const Category = require('../DAL/CategoryOps');
const UserCheck = require('../Midddleware/AuthMiddleware');
const AdminCheck = require('../Midddleware/AdminMiddleware');

router.post('/parent',AdminCheck, async(req, res)=>{
    var cat = await Category.addParentCategory(req.body)
    if(cat.Name)
    {
        res.status(200).json(cat);
    }
    else if(cat.code == "ER_DUP_ENTRY")
    {
        res.status(409).send(cat);
    }
    else
    {
        res.status(500).send(cat);
    }
});

router.post('/child',AdminCheck,async(req, res)=>{
    var cat = await Category.addSubCategory1(req.body)
    if(cat.Name)
    {
        res.status(200).json(cat);
    }
    else if(cat.code == "ER_DUP_ENTRY")
    {
        res.status(409).send(cat);
    }
    else
    {
        res.status(500).send(cat);
    }
});

router.post('/grandChild/:child:/parent',AdminCheck,async(req, res)=>{
    var cat = await Category.addSubCategory2(req.body)
    if(cat.Name)
    {
        res.status(200).json(cat);
    }
    else if(cat.code == "ER_DUP_ENTRY")
    {
        res.status(409).send(cat);
    }
    else
    {
        res.status(500).send(cat);
    }
});

router.get('/parent/:id', UserCheck, async(req,res)=>
{
    let cat = await Category.getParentCategory(req.params.id);
    res.status(200).send(cat);
});

router.get('/child', UserCheck, async(req,res)=>
{
    let cat = await Category.getParentCategory(req.params.id);
    res.status(200).send(cat);
});

router.get('/grandchild/:id', UserCheck, async(req,res)=>
{
    let cat = await Category.getChildCategory(req.params.id);
    res.status(200).send(cat);
});

router.delete('/parent/:id',UserCheck, async(req,res)=>
{
    let cat = await Category.getGrandChildCategory(req.params.id);
    res.status(200).send(cat);
});

router.delete('/child/:id',UserCheck, async(req,res)=>
{
    let cat = await Category.getGrandChildCategory(req.params.id);
    res.status(200).send(cat);
});

router.delete('/grandChild/:id',UserCheck, async(req,res)=>
{
    let cat = await Category.getGrandChildCategory(req.params.id);
    res.status(200).send(cat);
});


module.exports = router;






