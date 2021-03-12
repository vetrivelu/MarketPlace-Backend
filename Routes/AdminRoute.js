const express = require('express');
const router = express.Router();
const Admin     = require('../Auth/AdminAuth');


router.post('/register', async(req, res)=>{
    console.log("Endpoin hit");
    var code = await Admin.register(req.body);
    if(code.id)
    {
        console.log("Successful User Registration");
        res.status(200).send("User Registration Successfull");
    }
    else if (code.code == 11000)
    {
        console.log("Duplicate user");
        res.status(409).send("Duplicate resgistration attempt");
    }
    else
    {
        res.status(500).send(code);
    }
});

router.post('/sign_in', async(req, res)=>{
    var user = await Admin.signIn(req.body);
    if(user.userToken)
    {
        res.status(200).json(user);
    }
    else if(user == "PASS_ERR")
    {
        console.log("Please check the Password");
        res.status(403).send("Please check the password");
    }
    else if (user == "INVALID_USR")
    {
        console.log("Invalid user");
        res.status(404).send("User not found");
    }
    else
    {
        res.status(500).send("unknown error");
    }
});

router.get('/client/:id', async(req, res)=>{
    var clients = await Admin.getClients(req.params.id);
    if(clients)
    {
        res.send(clients);
    }
    else{
        res.status(404);
    }
});

router.get('/:id', async(req, res)=>{
    var clients = await Admin.getAdmins(req.params.id);
    if(clients)
    {
        res.send(clients);
    }
    else{
        res.status(404);
    }
});


module.exports = router;

