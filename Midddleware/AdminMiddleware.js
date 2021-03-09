
const jwtConfig = require('../config/jwt-config');
const JWT = require('jsonwebtoken');

module.exports = function (req, res, next) {
    let userToken = req.headers["authorization"]; 
    var error;
    if(userToken)
    {   
        //verify if client
        JWT.verify(userToken,jwtConfig.AdminSecret,(err, decoded)=>{
            if(err) {
                error = err;
                return res.status(500).json(err.message);
            }
            else {
                req.user = decoded;
                console.log(req.user);
                next();
            }
            
        });
                 
    }
    else
    {
        //we dont have token 
        res.status(500).json({
            status : 0,
            message :   "Session expired, Please login again",
        })
    }
 }
