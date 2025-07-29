const Joi = require('joi');

const schemaRegister = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(3).required(),
    role: Joi.string().default('user').optional(),
})

function authValidateRegister(req,res,next){
    const {error}= schemaRegister.validate(req.body);
    if (error)  return res.status(404).send(error.details[0].message)
    next();
}

const schemaLogin = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(3).required()
})

function authValidateLogin(req,res,next){
    const {error}= schemaLogin.validate(req.body);
    if (error)  return res.status(404).send(error.details[0].message)
    next();
}

module.exports = {authValidateRegister , authValidateLogin};