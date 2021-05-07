const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');
const jwtConfig = require('../config/jwt-config');
const Admin = require('../models/admin');
const Client = require('../models/client');
// var initModels = require("../models/init-models");
// const sequelize = require("../DAL/Connection");
// var Admins = initModels(sequelize).admin;
// const admin = require('../models/admin');

async function register(params)
{
    params.password = bcrypt.hashSync(params.password, 5);
    let admin = new Admin(params);
    try 
    {
        const result = await admin.save();
        return result;
    }
    catch (err)
    {
        console.log(err);
        return err;
       
    }
    
}

async function signIn(params)
{
    const filter = { email : params.email };
    var admin = await Admin.findOne(filter, (err, admin)=>{
        if(err)
        {
            return {id  :   null, err : err};
        }
    });
    if(admin)
    {
        if(bcrypt.compareSync(params.password, admin.password))
        {
            console.log("Password matched");
            let userToken = JWT.sign({
                email   :   admin.email,
                id      :   admin._id,
                isAdmin :   true,
            },
            jwtConfig.AdminSecret,
            {
                expiresIn   :   jwtConfig.expiresIn,
            });
            
            return ({
                    userToken   :   userToken,
                    expiresIn   :   jwtConfig.expiresIn,
                    isAdmin     :   true,
                    id          :   admin._id,
                    name        :   admin.name,
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

async function getClients(id)
{
    if(id!='0')
    {
        const filter = { clientID   :   id };
        var client = await Client.findOne(filter, (err, client)=>{
            if(err)
            {
                return err;
            }
        });
        return client;
    }
    else
    { 
        var clients = await Client.find({},'clientID name storeName phoneNumber corporateAddress walletAmount totalOrder totalSales status');
        return clients;
    }
    
}

async function getAdmins(id)
{
    if(id!='0')
    {
        const filter = { _id   :   id };
        var admin = await Admin.findOne(filter, (err, admin)=>{
            if(err)
            {
                return err;
            }
        });
        return admin;
    }
    else
    { 
        var admins = await Admins.find({},'clientID name storeName corporateAddress walletAmount totalOrder totalSales status');
        return admins;
    }
    
}

module.exports.signIn = signIn;
module.exports.register = register;
module.exports.getClients = getClients;
module.exports.getAdmins = getAdmins;
// module.exports.approve  =   approve;