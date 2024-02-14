const Joi = require("joi");

const schema = Joi.object({
  email: Joi.string().email({
    minDomainSegments: 1,
    tlds: { allow: ["com"] },
  }),
  name: Joi.string().min(3).max(50).required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
  isActive: Joi.boolean().strict(),
  isBlocked: Joi.boolean().strict(),
  role: [Joi.string(), Joi.number()],

  dob: Joi.number().integer().min(1900).max(2013),
});

const validate = async (req, res, next) => {
  const { error } = Schema.validate(req.body);
  if (error) next(error.details[0].message);
  else next();
};

module.exports = { validate };
