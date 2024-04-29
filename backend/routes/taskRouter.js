const express = require('express');
const { auth } = require('../middlware/auth.middleware');
const { access } = require('../middlware/access.middleware')
const {TaskModel} = require('../models/Task.model')

const taskRouter = express.Router();

taskRouter.get('/', auth , access('admin','manager') , async(req,res)=>{
    try{
        const tasks = await TaskModel.find();
        res.status(200).json(tasks)

    }catch(err){
        res.status(404).json({message: err.message});

    }
})
taskRouter.get('/todaytask', auth, access('admin','manager'), async(req,res) => {
    try{
        const curdate = new Date().getDate().toString()
        const tasks = await TaskModel.find({date: curdate})
        res.status(200).json(tasks)

    }catch(err){
        res.status(404).json({message: err.message});
    }

})
taskRouter.get('/mytasks', auth, async(req,res) => {
    try{
        const tasks = await TaskModel.find({user_id:req.id})
        res.status(200).json(tasks)
        
    }catch(err){
        res.status(404).json({message: err.message});
    }
})

taskRouter.post('/', auth, async(req,res) => {
    try{
        const {title} = req.body;
        const date = new Date().getDate().toString()
        const {id} = req;
        console.log(id);
        const task = new TaskModel({user_id:id,title,date})
         await task.save()
         res.status(201).json({msg:"Task saved successfully"})

    }catch(err){
        res.status(404).json({message: err.message});
    }
})

taskRouter.patch('/:id', auth, async(req,res) => {
    try{
        const {id} = req.params
        if(req.body.approval == 'success'){
            res.json({msg:"task approval success manager should be updated"})
        }else{
        const task = TaskModel.findByIdAndUpdate({id},req.body)
        res.status(200).json({msg:"Task updated successfully"})

        }
    }catch(err){
        res.status(404).json({message: err.message});
    }
})

taskRouter.patch('/updateTask/:id', auth,access('manager'), async(req,res) => {
    try{
        const {id} = req.params

        const task = TaskModel.findByIdAndUpdate({id},req.body)
        res.status(200).json({msg:"Task updated successfully"})

    }catch(err){
        res.status(404).json({message: err.message});
    }
})

taskRouter.delete('/:id', auth, async(req,res) => {
    try{
        const {id} = req.params
        const task = await TaskModel.findById(id)
        console.log(task);
        if(task.approval == 'success'){
          await TaskModel.findByIdAndDelete(id);
        res.status(200).json({msg:"Task deleted successfully"})
        }else{
            res.status(200).json({msg:"manager not approved yet to delete the task"})
        }

    }catch(err){
        res.status(404).json({message:err})
    }

})

module.exports = {
    taskRouter
}