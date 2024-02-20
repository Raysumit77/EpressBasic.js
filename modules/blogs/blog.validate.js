const Joi = require("joi");

const Schema = Joi.object({
  title: Joi.string().required(),
  slug: Joi.string()
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
    .message(
      "Invalid slug format. Slugs must contain only lowercase letters, numbers, and hyphens, and cannot start or end with a hyphen."
    )
    .required(),
  content: Joi.string().required(),
  author: Joi.string().required(),
});

const validate = async (req, res, next) => {
  const { error } = Schema.validate(req.body);
  if (error) next(error.details[0].message);
  next();
};

module.exports = { validate };
