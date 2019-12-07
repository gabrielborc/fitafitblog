import * as Joi from '@hapi/joi';

export const detail = Joi.object({
    id: Joi.number().required()
});

export const payload = Joi.object({
    name: Joi.string().min(2).max(100).required()    
})