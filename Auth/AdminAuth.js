const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');
const jwtConfig = require('../config/jwt-config');
const Admin = require('../models/admin');
// var initModels = require("../models/init-models");
// const sequelize = require("../DAL/Connection");
// var Admins = initModels(sequelize).admin;
// const admin = require('../models/admin');

async function register(params)
{
    params.password = bcrypt.hashSync(params.password, 5);
    let admin = new Admin(params);
    const result = await admin.save().catch((err)=>{
        console.log(err);
    });
    return result;
}

async function signIn(params)
{
    var admin = await Admins.findOne({
        where   : {
            Email : params.Email,
        }}).catch((err)=>{
            console.log(err);
            return err;      
        });
    if(admin)
    {
        if(bcrypt.compareSync(params.Password, admin.Password))
        {
            console.log("Password matched");
            let userToken = JWT.sign({
                Email   :   admin.Email,
                ID      :   admin.ID,
                // isApproved  :   admin.isActiveSubscription,
                isAdmin :   true,
            },
            jwtConfig.AdminSecret,
            {
                expiresIn   :   jwtConfig.expiresIn,
            })
            
            return ({
                    userToken   :   userToken,
                    expiresIn   :   jwtConfig.expiresIn,
                    isAdmin     :   true,
                    ID          :   admin.ID,
                    Name        :   admin.Name,
                    isActiveSubscription    :   admin.isActiveSubscription,
            });
        }
        else
        {
            return "PASS_ERR";
        }         
    }
    else
    {
        console.log("User not found");
        return "INVALID_USR";       
    }
}

module.exports.signIn = signIn;
module.exports.register = register;