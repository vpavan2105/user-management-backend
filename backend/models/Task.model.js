const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    user_id:{type: mongoose.ObjectId},
    title:{type:String},
    status:{type:String,enum:["pending","inprogress","completed"],default:'pending'},
    date : {type : String},
    approval : {type:String,enum:["pending","onprogress","success"],default:'pending'},
})

const TaskModel = mongoose.model('tasks', TaskSchema)

module.exports = {
    TaskModel
}