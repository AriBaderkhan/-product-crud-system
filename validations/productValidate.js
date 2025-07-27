const Joi = require('joi')

const scheemaAdd = Joi.object({
    name: Joi.string().required(),
    price: Joi.number().required(),
    quantity: Joi.number().optional(),
    description: Joi.string().optional()
})

function validateProductAdd(req,res,next){
    const { error } = scheemaAdd.validate(req.body);
    if (error) return res.status(404).send(error.details[0].message)
    next();
}

const ScheemaUpdate = Joi.object({
    name: Joi.string().optional(),
    price: Joi.number().optional(),
    quantity: Joi.number().optional(),
    description: Joi.string().optional()
})

function validateProductUpdate(req,res,next){
    const { error } = ScheemaUpdate.validate(req.body);
    if (error) return res.status(404).send(error.details[0].message)
    next();
}

module.exports = {validateProductAdd , validateProductUpdate}