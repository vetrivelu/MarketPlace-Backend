const express = require('express');
const router = express.Router();
const Client     = require('../Auth/ClientAuth');

router.post('/register', async(req, res)=>{
    console.log("Endpoin hit");
    var code = await Client.register(req.body);
    if(code._id)
    {
        console.log("Successful User Registration");
        res.status(200).send("User Registration Successfull");
    }
    else if (code == "DUPL_USER")
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
    var user = await Client.signIn(req.body);
    if(user.id)
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

module.exports = router;

