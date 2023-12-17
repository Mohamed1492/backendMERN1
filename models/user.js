const mongoose=require('mongoose');
const shema= mongoose.Schema;
let userModel = new shema({
    userRole: {
        type: String,
        roles: ["user", "admin"],
        default: "user"
      },
    firstName:String,
    lastName: String,
    email:String,
    password:String,
    phone:String,
 
});
module.exports= mongoose.model("user",userModel)