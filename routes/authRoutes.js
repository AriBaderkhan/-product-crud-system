const express = require('express');
const router = express.Router();
const {authControllerRegister , authControllerLogin}  = require('../controllers/authController');
const {authValidateRegister , authValidateLogin} = require('../validations/authValidate');
const verifyToken = require('../middlewares/authMiddleware');
const {checkRole} = require('../middlewares/roleMiddleware');

const rateLimit =  require('express-rate-limit');
const loginLimiter = rateLimit({
  windowMs: 30 * 1000, // 15 seconds
  max: 3, // Max 3 requests per windowMs
  message: {
    status: 429,
    message: '⛔ Too many requests, slow down!',
  },
});

router.post('/register',authValidateRegister , authControllerRegister)
router.post('/login',loginLimiter,authValidateLogin , authControllerLogin)

router.get('/adminDashboard',verifyToken ,checkRole('Admin'), (req,res)=>{  // test for protectiong path
    const user = req.user.name
    res.status(200).send(`welcome to the Admin dashboard ${user}`)
})

router.get('/userDashboard',verifyToken ,checkRole('user'), (req,res)=>{  // test for protectiong path + adding RBAC
    const user = req.user.name
    res.status(200).send(`welcome to the your private dashboard ${user}`)
})


module.exports = router;