const mongoose = require('mongoose');
require('dotenv').config();

const connectionToDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_STR)

    }catch(err){
        console.log(err);
        process.exit(1);
    }
}

module.exports = {
    connectionToDB
}