const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username :{ type : String },
    password :{ type : String},
    email:{ type : String},
    role : { type: String, enum : ['user','admin','manager'], default:'user'}
})

const UserModel = mongoose.model('users', UserSchema);

module.exports = {
    UserModel
}