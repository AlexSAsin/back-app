const Joi = require('joi');
const validator = require('express-joi-validation').createValidator({})

const postPostStruct = Joi.object({
    id: Joi.number(),
    name: Joi.string().required(),
    floorsCount: Joi.number().required(),
    lotType: Joi.number().required(),
    inOperationDate: Joi.date().required(),
    parkingAvailable: Joi.boolean().required(),
    parkingCount: Joi.number().required(),
    constructiveType: Joi.number().required(),
    district: Joi.string().required(),
    city: Joi.string().required(),
});

exports.postPostJoi = validator.body(postPostStruct)

const postPatchStruct = Joi.object({
  name: Joi.string(),
  floorsCount: Joi.number(),
  lotType: Joi.number(),
  inOperationDate: Joi.date(),
  parkingAvailable: Joi.boolean(),
  parkingCount: Joi.number(),
  constructiveType: Joi.number(),
  district: Joi.string(),
  city: Joi.string(),
});

exports.postPatchJoi =  validator.body(postPatchStruct)