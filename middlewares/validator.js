const {check,validationResult}=require("express-validator");

exports.SignUpRules=()=>[
check("firstName","this field is required").notEmpty(),
check("lastName","this field is required").notEmpty(),
check("email","this field is required").notEmpty(),
check("email","this should be a valid email").isEmail(),
check("password","this field is required,Password must contain at least 6 characters").notEmpty().isLength({min:6}),
check("phone","this should be a valid number").isLength({max:10})
// .isLength({min:10})

];
exports.loginRules=()=>[
    check("email","this field is required").notEmpty(),
    check("password","this field is required").notEmpty(),
];

exports.validator=(req,res,next)=>{
    const errors=validationResult(req);
    return errors.isEmpty()?next():res.status(400).json({errors:errors.array()});
}