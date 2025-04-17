import Joi from "joi"

const validUser = Joi.object({
    username:Joi.string().required(),
    email:Joi.string().required(),
    password:Joi.string().min(8).required()
})

export default validUser;