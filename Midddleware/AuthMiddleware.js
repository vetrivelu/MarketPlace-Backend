
const jwtConfig = require('../config/jwt-config');
const JWT = require('jsonwebtoken');

module.exports = function (req, res, next) {
    let userToken = req.headers["authorization"]; 
    if(userToken)
    {   
        try
        {
            var decoded = jwt.verify(userToken, jwtConfig.ClientSecret);
            if(decoded.id)
            {
                req.user = decoded;
                next();
            }
            else
            {
                var decoded = jwt.verify(userToken, jwtConfig.AdminSecret);
                if(decoded.id && decoded.isAdmin)
                {
                    req.user = decoded;
                    next();
                }
            }   
        }
        catch (error)
        {
            res.status(500).json(error);
        }
                 
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
