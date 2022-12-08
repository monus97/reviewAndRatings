const jwt = require("jsonwebtoken")
const user = require("../model/userschema");

const checkUserAuth = async(req,res,next)=>{
    let token;
    const{authorization} = req.headers;
    if (authorization && authorization.startsWith("Bearer")){
        try{
            // get token from header 
            token = authorization.split(" ")[1];
            console.log('token:',token);
            console.log('Authorization:',authorization);
            const{userID} = jwt.verify(token,process.env.JWT_SECRET_KEY);
            req.user = await user.findById(userID).select('-password');
            next();
        }catch(error){
            console.log(error);
            res.status(401).send({
                status:"failed",message:"Unauthorized user"
            });
        }
    }if (!token){
        res.status(401).send({"message":"unauthorized user no token"})
    }
};
module.exports = {checkUserAuth}
