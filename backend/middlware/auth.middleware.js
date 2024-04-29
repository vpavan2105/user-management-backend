const { UserModel } = require('../models/User.model');
const jwt = require('jsonwebtoken')
require('dotenv').config()
const auth = (req,res,next) => {
    const token = req.headers.authorization.split(" ")[1];
    if(token){
        jwt.verify(token,process.env.PRIVATE_KEY, async (err,result) => {
            if(err){
                res.status(200).json({msg:err})
            }else{
            
                const user = await UserModel.findById(result.id);
                console.log(user);
                req.role = user.role
                req.id = user._id
                next();
            }
        } )

    }else{
        res.status(200).json({msg:"please login"})
    }

}

module.exports = {
    auth
}