const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');
const jwtConfig = require('../config/jwt-config');
const Client = require('../models/client');

async function register(params)
{
    params.password = bcrypt.hashSync(params.password, 5);
    let newClient = new Client(params);
    let result = newClient.save();
    return result;
}

async function signIn(params)
{  
    var client = await Client.findOne({
        where   : {
            Email : params.Email,
        }}).catch((err)=>{
            console.log(err.message, err);
            return err;      
        });
    if(client)
    {
        if(bcrypt.compareSync(params.Password, client.Password))
        {
            console.log("Password matched");
            let userToken = JWT.sign({
                Email   :   client.Email,
                ID      :   client.ID,
                // isApproved  :   client.IsApproved,
                isAdmin :   false,
            },
            jwtConfig.ClientSecret,
            {
                expiresIn   :   jwtConfig.expiresIn,
            });
            
            return ({
                   id           :   client.ID,
                   name         :   client.Name,
                   PhoneNumber  :   client.PhoneNumber,
                   StoreName    :   client.StoreName,
                   CorporateAddress :   client['Corporate Address'],
                   WalletAmount :   client['Wallet Amount'],
                   TotalSales   :   client['TotalSales amount'],
                   TotalOrder   :   client['Total Order'],
                   isApproved   :   client.IsApproved,
                   userToken    :   userToken,      
                   expiresIn    :   1800,
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