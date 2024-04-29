

const access = (...roles) => {
    return (req,res,next) => {
        if(roles.includes(req.role)){
            next();
        }else{
            res.status(404).json({msg:"you cant access "})
        }
    }
}

module.exports = {
    access
}