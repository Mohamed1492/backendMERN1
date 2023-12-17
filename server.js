const express = require("express");
const connectDB= require('./config/connectDB');
const user = require('./routes/user');
const product = require('./routes/product');
// const admin =require('./routes/admin');
const app= express();
connectDB();
app.use(express.json());
// user link
app.use("/user",user);
// product link
app.use("/product",product)
// app.use("/admin",admin);

app.use((req,res)=>{
    res.send("API is running...")
})
app.listen(5000, err=> err?console.log(err):console.log(`the server is running successfully on PORT: 5000`));