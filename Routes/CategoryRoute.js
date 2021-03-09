const express = require('express');
const router = express.Router();
const Category = require('../DAL/CategoryOps');
const UserCheck = require('../Midddleware/AuthMiddleware');
const AdminCheck = require('../Midddleware/AdminMiddleware');

router.post('/addParent',AdminCheck, async(req, res)=>{
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

router.post('/addChild',AdminCheck,async(req, res)=>{
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

router.post('/addGrandChild/:child:/parent',AdminCheck,async(req, res)=>{
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

router.get('/getParent/:id', UserCheck, async(req,res)=>
{
    let cat = await Category.getParentCategory(req.params.id);
    res.status(200).send(cat);
})
router.get('/getParent', UserCheck, async(req,res)=>
{
    let cat = await Category.getParentCategory(req.params.id);
    res.status(200).send(cat);
})

router.get('/getChild/:id', UserCheck, async(req,res)=>
{
    let cat = await Category.getChildCategory(req.params.id);
    res.status(200).send(cat);
})
router.get('/getGrandChild/:id',UserCheck, async(req,res)=>
{
    let cat = await Category.getGrandChildCategory(req.params.id);
    res.status(200).send(cat);
})


module.exports = router;






