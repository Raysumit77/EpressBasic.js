const Joi = require("joi");

const Schema = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 1,
      tlds: { allow: ["com"] },
    })
    .required(),
  name: Joi.string().min(3).max(50).required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
  roles: Joi.array().items(Joi.string().valid("admin", "user")),
  // isActive: Joi.boolean().strict(),
  // isBlocked: Joi.boolean().strict(),
  // role: [Joi.string(), Joi.number()],

  // dob: Joi.number().integer().min(1900).max(2013),
});
const LoginSchema = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 1,
      tlds: { allow: ["com"] },
    })
    .required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
});
const validate = (req, res, next) => {
  const { error } = Schema.validate(req.body);
  if (error) next(error.details[0].message);
  next();
};
const Login = (req, res, next) => {
  const { error } = LoginSchema.validate(req.body);
  if (error) next(error.details[0].message);
  next();
};

module.exports = { validate, Login };
