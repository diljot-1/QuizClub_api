const tokenOperations = require("../utils/token");

module.exports = function(request, response, next){
    let authToken = request.header('tokenid');
    if(authToken){
        let result = tokenOperations.verifyToken(authToken);
        if(result){
            next();
        }
        else{
            response.status(401).json({message:'Authorization Failed, Invalid or No Token'});
        }
    }
    else{
        response.status(401).json({message:'Authorization Failed, Invalid or No Token'});
    }
}