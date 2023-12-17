const jwt=require("jsonwebtoken");
const config=require("config");
const secret=config.get("secret");
const User = require("../models/user");

const isAdmin = async (req,res,next)=>{
    let token= req.headers.authorization;

    try {
        const decoded= await jwt.verify(token,secret);
        // Check if the user is an admin
        const user= await User.findById(decoded._id);
    if (user.userRole !== "admin") {
        return res.status(403).json({ msg: "Forbidden: Admin access required" });
      }
        
        else{
            req.user=user;
            next();
        }
        
    } catch (error) {
        res.status(503).json({msg:error.message})
    }
}
module.exports= isAdmin