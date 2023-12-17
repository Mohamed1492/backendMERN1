const config= require('config')
const db= config.get('db');
const mongoose = require("mongoose");

const connectDB= async()=>{
    try {
        await mongoose.connect(db);
        console.log("the database is connnected successfully")
    } catch (error) {
        console.log(error.message)
    }
}

module.exports= connectDB;