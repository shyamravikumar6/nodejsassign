const express = require('express');
const { signout,signup } = require('../controllers/auth');
const router = express.Router();


router.get("/signout", signout );
router.post("/signup",signup );
module.exports = router;    