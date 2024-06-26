const express = require('express');
const router = express.Router();
const userRegister = require('../controllers/users/register');
const userLogin = require('../controllers/users/login');

router.post('/register',userRegister);
router.post("/login",userLogin)

module.exports = router;
