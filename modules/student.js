const { number } = require('Joi');
const Joi = require('joi');

const student_schema = Joi.object({
    nom: Joi.string().required(),
    classe: Joi.string().required(),
    modules: Joi.array().required() [{module : String , note : number}],
    moyenne: Joi.number()
});

const student_update_schema = Joi.object({
    nom: Joi.string().required(),
    classe: Joi.string().required(),
    modules: Joi.array().required(),
    moyenne: Joi.number()
});

module.exports.student_schema=student_schema;
module.exports.student_update_schema=student_update_schema;