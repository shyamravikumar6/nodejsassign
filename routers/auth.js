const express = require('express');
const { signout,signup,signin } = require('../controllers/auth');
const router = express.Router();
const {check} = require('express-validator');


router.get("/signout", signout );
router.post("/signup",[
    check("firstname","name should be al least 3 charachter").isLength({min:3}),
    check("password", "password should  be 7 character").isLength({min:7}),
     check("email","not a email").isEmail()
],signup );
router.post("/signin",[
check("password", "password should  be 7 character").isLength({min:7}),
     check("email","not a email").isEmail()
],signin);

module.exports = router;    