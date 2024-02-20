const userModel = require("./user.model");
const { mail } = require("../../services/nodemailer");
const { hashPassword } = require("../../utils/bcrypt");

//create
const create = (payload) => {
  return userModel.create(payload);
};

//read part1
const list = () => {
  return userModel.find();
};

//read part 2
const getById = (_id) => {
  return userModel.findOne({ _id });
};

//update
const updateById = (_id, payload) => {
  return userModel.updateOne({ _id }, payload);
};

//delete
const removeById = (_id) => {
  return userModel.deleteOne({ _id });
};
//register
const register = async (payload) => {
  delete payload.roles;
  payload.password = hashPassword(payload.password);
  const user = await userModel.create(payload);
  if (!user) throw new Error("Registration failed");
  //email
  return mail(
    user.email,
    "registration Completed",
    "you are successfully registered. thank you for registering."
  );
};

module.exports = { create, list, getById, updateById, removeById, register };
