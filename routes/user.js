const express=require ("express");
const { signup,login,getUser, getAllUser } = require("../controllers/user.Controller");
const { SignUpRules, validator,loginRules} = require("../middlewares/validator");
const auth= require("../middlewares/auth");

const router= express.Router();
// link path & function controler
router.post('/signup', SignUpRules(),validator,signup); 
router.post('/login',login)
router.get("/get",auth,getUser)

// getall users
router.get("/getAllUser", getAllUser);

module.exports = router