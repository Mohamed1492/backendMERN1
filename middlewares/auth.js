const jwt=require("jsonwebtoken");
const config=require("config");
const secret=config.get("secret");
const User = require("../models/user");

const auth= async (req,res,next)=>{
    let token= req.headers.authorization;
    try {
        const decoded= await jwt.verify(token,secret);
        if (!decoded) return res.status(400).json({ msg: "invalid token" });
        const user= await User.findById(decoded._id);
        if(!user) return res.status(405).json({msg:"unauthorized"});
        
        else{
            req.user=user;
            next();
        }
        
    } catch (error) {
        res.status(503).json({msg:error.message})
    }
}
module.exports=auth