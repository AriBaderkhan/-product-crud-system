const express = require('express');
const router = express.Router();
const {authControllerRegister , authControllerLogin}  = require('../controllers/authController')
const {authValidateRegister , authValidateLogin} = require('../validations/authValidate')
const verifyToken = require('../middlewares/authMiddleware')

router.post('/register',authValidateRegister , authControllerRegister)
router.post('/login',authValidateLogin , authControllerLogin)
router.get('/dashboard',verifyToken , (req,res)=>{
    const user = req.user.name
    res.status(200).send(`welcome to the dashboard ${user}`)
})


module.exports = router;