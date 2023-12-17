const user = require("../models/user");
const bc = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config=require('config');
const secret=config.get("secret");
exports.signup= async(req,res)=>{
    const {phone, firstName,lastName,password,userRole,email}= req.body;
    try {
        // verify if the user's email already exist
        const existantUser= await user.findOne({email})
        if (existantUser)return res.status(409).json({msg: "Email already used"});

        // add new user
        const newUser = new user({
            firstName,
            lastName,
            email,
            password,
            phone,
            userRole,
        });
        
        // coding the password
        const salt= await  bc.genSalt(10);
        const hash=  bc.hashSync(password,salt)
        newUser.password=hash;
        await newUser.save();
        // console.log(newUser)
        const payload={
            _id :newUser._id,
            firstName: newUser.firstName,
            lastName:newUser.lastName,
            email:newUser.email,
            phone:newUser.phone,
            userRole:newUser.userRole
        };
            
        // define token
        let token=jwt.sign(payload,secret,{expiresIn:"2h"});
        res.status(201).send({
            token,
            user:{
                _id:newUser._id,
                userRole:newUser.userRole,
                firstName:newUser.firstName,
                lastName:newUser.lastName,
                email:newUser.email,
                phone:newUser.phone,
                password:newUser.password,
            }
        })
        res.status(200).json(newUser);
        
    } catch (error) {
        res.status(500).json({msg:error.message})
}};

exports.login= async(req,res)=>{
    const {password,email}= req.body;
    try {
        // check if user exists
        const identifyuser= await user.findOne({email});
        if (!identifyuser) return res.status(403).json({msg:"email or password not correct"})
        const isMatch= await bc.compare(password,identifyuser.password);
        
        if(!isMatch) return res.status(403).json({msg:'email or password not correct'});

        const payload={
            _id :identifyuser._id,
            firstName:identifyuser.firstName,
            lastName:identifyuser.lastName,
            email:identifyuser.email,
            phone:identifyuser.phone
        };
                
        const token = jwt.sign(payload, secret);
        res.status(201).send({
            token,
            user:{
                _id:identifyuser._id,
                firstName:identifyuser.firstName,
                lastName:identifyuser.lastName,
                email:identifyuser.email,
                phone:identifyuser.phone,
                password:identifyuser.password,
                userRole:identifyuser.userRole,
            }
        })

    } catch (error) {
        res.status(500).json({msg:error.message})
    }
}

exports.getUser=(req,res)=>{
    res.send(req.user)
};

//get all user
exports.getAllUser = async (req, res) => {
    try {
    const allUsers = await user.find();
    (allUsers)? res.status(201).json(allUsers)
        : res.status(401).json({ msg: "getAll error" });
    } catch (error) {
    res.status(501).json({ msg: error.message });
    }
};
