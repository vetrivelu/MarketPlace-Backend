// const bcrypt = require('bcrypt');
// const JWT = require('jsonwebtoken');
// const jwtConfig = require('../config/jwt-config');
// // var initModels = require("../models/init-models");
// const sequelize = require("../DAL/Connection");
// // var Clients = initModels(sequelize).client;


// async function registerClient(params)
// {
//     params.Password = bcrypt.hashSync(params.Password, 5);
    
//     var client =await Clients.create(params).catch(function(err)
//     {
//         if(err.message = 'SequelizeUniqueConstraintError')
//         {
//             console.log("Duplicate User Registration");
//             return "DUPL_USER";
//         }  
//         else
//         {
//             return err;
//         } 
//         console.log(err, params);       
//     })
//     return client;
// }

// async function signInClient(params)
// {
    
    
//     var client = await Clients.findOne({
//         where   : {
//             Email : params.Email,
//         }}).catch((err)=>{
//             console.log(err.message, err);
//             return err;      
//         });
//     if(client)
//     {
//         if(bcrypt.compareSync(params.Password, client.Password))
//         {
//             console.log("Password matched");
//             let userToken = JWT.sign({
//                 Email   :   client.Email,
//                 ID      :   client.ID,
//                 isApproved  :   client.IsApproved,
//                 isAdmin :   false,
//             },
//             jwtConfig.ClientSecret,
//             {
//                 expiresIn   :   jwtConfig.expiresIn,
//             })
            
//             return ({
//                    id           :   client.ID,
//                    name         :   client.name,
//                    PhoneNumber  :   client.PhoneNumber,
//                    StoreName    :   client.StoreName,
//                    CorporateAddress :   client['Corporate Address'],
//                    WalletAmount :   client['Wallet Amount'],
//                    OrderCount   :   client.OrderCount,
//                    TotalSales   :   client['TotalSales amount'],
//                    TotalOrder   :   client['Total Order'],
//                    isApproved   :   client.isApproved,
//                    userToken    :   userToken,      
//                    expiresIn    :   600000,
//             });
//         }
//         else
//         {
//             return "PASS_ERR";
//         }         
//     }
//     else
//     {
//         console.log("User not found");
//         return "INVALID_USR";       
//     }
// }




// module.exports.registerClient = registerClient;
// module.exports.signInClient = signInClient;
// // module.exports = {
// //     registerClient : async function registerClient (params)
// //     {
// //         params.Password = bcrypt.hashSync(params.Password, 5); 
    
// //         var client = await Clients.create(params).catch(function(err)
// //         {
// //             if(err.message = 'SequelizeUniqueConstraintError')
// //             {
// //                 console.log("Duplicate User Registration");
// //                 return "DUPL_USER";
// //             }  
// //             else
// //             {
// //                 return err;
// //             } 
// //             console.log(err, params);       
// //         })
// //         return client;
// //     }
// // }





// // }
// // router.post('/sign-in', async(req, res)=>
// // {
// //     Client.findOne({
// //         where   : {
// //             Email : req.body.Email,
// //         }
// //     }).then((client)=>{
// //         if(client)
// //         {
// //             if(bcrypt.compareSync(req.body.Password, client.Password))
// //             {
// //                 let userToken = JWT.sign({
// //                     Email   :   client.Email,
// //                     id      :   client.id
// //                 },
// //                 jwtConfig.secret,
// //                 {
// //                     expiresIn   :   jwtConfig.expiresIn,
// //                 }
// //                 )
// //                 console.log("Password matched");
// //                 res.status(200).json({
// //                    name         :   client.name,
// //                    PhoneNumber  :   client.PhoneNumber,
// //                    StoreName    :   client.StoreName,
// //                    CorporateAddress :   client.CorporateAddress,
// //                    WalletAmount :   client.WalletAmount,
// //                    OrderCount   :   client.OrderCount,
// //                    TotalSales   :   client.TotalSales,
// //                    isApproved   :   client.isApproved,
// //                    userToken    :   userToken,      
// //                    expiresIn    :   600000 
// //                 })
// //             }
// //             else
// //             {
// //                 res.Status(500).json({
// //                     message :   "Please check the password",
// //                 });
// //             }         
// //         }
// //         else
// //         {
// //             res.sendStatus(404);
// //             console.log("User not found");
// //         }
// //     }).catch((err)=>{
// //         console.log(err.message, err);
// //     })
    
// // })

// // router.get('/list',authCheck, async(req, res)=>{
// //     res.status(200).json({
// //         message : "Message",
// //     })
// // })

// // module.exports = router;
