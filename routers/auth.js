const express = require('express');
const { signout,signin,signup,isSigned} = require('../controllers/auth');
const router = express.Router();
const {check} = require('express-validator');


router.get("/signout", signout );
// router.post("/signupuser",[check("userName","name should be al least 5 charachter").isLength({min:5}),
//      check("userNum","phone num should be 10-12 digits").isNumeric().isLength({min:10,max:12}),
//      check("userAdd","user Address required and must be 50-100").isLength({min:50,max:100}),
//      check("password", "password should  be 8-15 character").isLength({min:8,max:15}),
//       check("useremail","not a email").isEmail()],signupuser);
router.post("/signup",[
    check("firstname","name should be al least 3 charachter").isLength({min:3}),
    check("password", "password should  be 7 character").isLength({min:7}),
     check("email","not a email").isEmail()
],signup );
router.post("/signin",[
check("password", "password should  be 7 character").isLength({min:7}),
     check("email","not a email").isEmail()
],signin);
router.get("/testroute",isSigned,(req,res)=>{res.send("A protected route");});

module.exports = router;    