const Joi = require('joi')

const scheemaAdd = Joi.object({
    username: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    age: Joi.number().optional(),
})

function validateStudentAdd(req,res,next){
    const {error}= scheemaAdd.validate(req.body);
    if (error)  return res.status(404).send(error.details[0].message)
    next();
}

const scheemaUpdate = Joi.object({
    username: Joi.string().min(3).optional(),
    email: Joi.string().email().optional(),
    password: Joi.string().min(6).optional(),
    age: Joi.number().optional(),
})

function validateStudentUpdate(req,res,next){
    const {error}= scheemaUpdate.validate(req.body);
    if (error)  return res.status(404).send(error.details[0].message)
    next();
}

module.exports= {validateStudentAdd , validateStudentUpdate}