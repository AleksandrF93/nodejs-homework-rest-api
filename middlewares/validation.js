const Joi = require('joi');
const {ValidationError} = require("../helpers/errors");

module.exports = {
    
addContactValidation: (req,res, next) => { const schema = Joi.object({
  name: Joi.string().min(3).max(12).required(),
  email: Joi.string().min(3).max(45).required().email().required(),
  phone: Joi.string().min(8).max(15).required(),
  })

  const validationResult = schema.validate(req.body);
  if (validationResult.error) {
   next( new ValidationError(JSON.stringify(validationResult.error.details)));
  }
   next()
},
putContactsValidation:(req, res, next)=>{
  const schema = Joi.object({
    name: Joi.string().min(3).max(12).required(),
    email: Joi.string().min(3).max(45).required().email().required(),
    phone: Joi.string().min(8).max(15).required(),
    favorite: Joi.boolean(),
    })
     const validatResult=schema.validate(req.body)
    if(validatResult.error){
     next( new ValidationError(validatResult.error.details))
    }
    next()   
},
favoriteContactScheme:(req, res, next)=>{
const schema =Joi.object({
      favorite: Joi.boolean().required(),
    });
    const validatResult=schema.validate(req.body)
    if(validatResult.error){
     next( new ValidationError (validatResult.error.details))
    }
    next()  
  },
};