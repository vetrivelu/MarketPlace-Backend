const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');
const jwtConfig = require('../config/jwt-config');
const Client = require('../models/client');

async function register(params, image)
{
    params.password = bcrypt.hashSync(params.password, 5);
    let newClient = new Client(params);
    newClient.proof = {
        data      : image.buffer,
        name      : image.originalname,
        encoding  : image.encoding,
        type      : image.mimetype,
    }
    try
    { 
        let result = await newClient.save();
        return result;
    }catch(err)
    {
        if(err.code == 11000)
        {
            return "DUPL_USER";
        }
    }
}


async function signIn(params)
{  
    const filter = { email   :   params.email };
    var client = await Client.findOne(filter, (err, client)=>{
        if(err)
        {
            return err;
        }
    });
        // .catch((err)=>{
        //     console.log(err.message, err);
        //     return err;      
        // });
    if(client)
    {
        if(bcrypt.compareSync(params.password, client.password))
        {
            console.log("Password matched");
            let userToken = JWT.sign({
                email   :   client.email,
                id      :   client.id,
                isAdmin :   false,
            },
            jwtConfig.ClientSecret,
            {
                expiresIn   :   jwtConfig.expiresIn,
            });
            
            return ({
                   id           :   client.id,
                   name         :   client.name,
                   phoneNumber  :   client.phoneNumber,
                   storeName    :   client.storeName,
                   corporateAddress :   client.corporateAddress,
                   walletAmount :   client.walletAmount,
                   totalSales   :   client.totalSales,
                   totalOrder   :   client.totalOrder,
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

// async function uploadProof(image, id)
// {
//     const filter = { ClientID : id };
//     const update = { 
//         proof       : image.buffer,
//     };
//     try
//     {
//         let client = Client.findOneAndUpdate(filter, update);
//         return client;
//     }
//     catch(err)
//     {
//         console.log(err);
//         return err;
//     }

// }

module.exports.signIn = signIn;
module.exports.register = register;
