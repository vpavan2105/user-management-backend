const express = require('express');
require('dotenv').config()
const { UserModel } = require('../models/User.model');
const userRouter = express.Router();
const jwt = require('jsonwebtoken');
const { auth } = require('../middlware/auth.middleware');
const { access } = require('../middlware/access.middleware');

userRouter.get('/', auth,access('admin'),async (req,res)=>{
    const users = await UserModel.find();
    res.status(200).json(users)
})

userRouter.patch('/:id',auth,access('admin'),async (req,res)=>{
    try{
        const {id} = req.params
        await UserModel.findByIdAndUpdate(id,req.body)
         res.status(200).json({msg:"success updated the user"})
    }catch(err){
        res.status(404).json({msg:err})
    }
})
userRouter.delete('/:id',auth,access('admin'),async (req,res)=>{
    try{
       const {id} = req.params
        await UserModel.findByIdAndDelete(id)
         res.status(200).json({msg:"success deleted the user"})
    }catch(err){
        res.status(404).json({msg:err})
    }
})

userRouter.post('/register', async(req,res) => {
    try{
        console.log(req.body);
       user = new UserModel(req.body);
       await user.save();
       res.status(201).json({msg:"user successfully registered"})
    }catch(err){
        res.status(404).json({msg:err})
    }
})

userRouter.post('/login', async(req,res)=>{
    try{
        const {username,password} = req.body;
        const user = await UserModel.findOne({username:username})
        if(user){
            const isPassword = user.password === password;
            if(isPassword){
              jwt.sign({id :user._id},process.env.PRIVATE_KEY,(err,result) => {
                    if(err){
                        return res.status(200).json({msg:err})
                    }else{
                        res.status(200).json({token:result})
                    }
                })

            }else{
                res.status(200).json({msg:"password incorrect"})
            }

        }else{
            res.status(200).json({msg:"user not found"})

        }
        
    }catch(err){
        res.status(404).json({msg:err})
    }
})

module.exports = {
    userRouter
}