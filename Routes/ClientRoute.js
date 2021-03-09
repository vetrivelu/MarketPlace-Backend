const express = require('express');
const router = express.Router();
const Client     = require('../Auth/ClientAuth');
var User = require('../models/client');
var Cart = require('../models/Cart');
var async = require('async');

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

router.get('/profile', passportConf.isAuthenticated, function(req, res, next) {
    User
      .findOne({ _id: req.user._id })
      .populate('history.item')
      .exec(function(err, foundUser) {
        if (err) return next(err);
  
        res.render('accounts/profile', { user: foundUser });
      });
  });

  router.get('/edit-profile', function(req, res, next) {
    res.render('accounts/edit-profile', { message: req.flash('success')});
  });
  
  router.post('/edit-profile', function(req, res, next) {
    User.findOne({ _id: req.user._id }, function(err, user) {
  
      if (err) return next(err);
  
      user.save(function(err) {
        if (err) return next(err);
        req.flash('success', 'Successfully Edited your profile');
        return res.redirect('/edit-profile');
      });
    });
  });

module.exports = router;

