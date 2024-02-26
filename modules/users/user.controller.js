const userModel = require("./user.model");
const { mail } = require("../../services/nodemailer");
const { hashPassword, comparePassword } = require("../../utils/bcrypt");
const { generateToken, generateRandomToken } = require("../../utils/token");
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

//login
const login = async (payload) => {
  const { email, password } = payload;
  if (!email || !password) throw new Error("Email or password is missing");
  const user = await userModel.findOne({ email });
  if (!user) throw new Error("user doesn't exists");
  const isValidPw = comparePassword(password, user.password);
const tokenData = { name: user.name,email: user.email,role:user.roles};
 return generateToken(tokenData);
};

const generateFPToken = async (payload) => {
  //email xa ki xaina?
  const { email } = payload;
  if (!email) throw new Error("Email doesn't exist");
  //user exists??
  const user = await userModel.findOne({ email, isActive: true });
  if (!user) throw new Error("user doesn't exist");
  //fp token utils?
  const token = generateRandomToken();
  console.log(generateRandomToken);
  //store that token in user model token
  const updateUser = await userModel.updateOne({ email }, { token });
  if (!updateUser) throw new Error("something went wrong. Try again later");
  //send that token in users email
  await mail(email, "Forget Password Token", `your token is${token}`);
  return "Forget Password Token generated sucesfully";
};

const verifyFPToken = async (payload) => {
  const { email, token, newPassword } = payload;
  if (!email || !token || !newPassword) throw new Error("something is missing");
  //user exist
  const user = await userModel.findOne({ email, isActive: true });
  if (!user) throw new Error("User doesn't exist");
  //compare two tokens
  const isValidToken = token === user.token;
  if (!isValidToken) throw new Error("Token mismatch");
  //user update with new password
  const updatedUser = await userModel.updateOne(
    { email },
    { password: hashPassword(newPassword), token: "" }
  );
  if (!updatedUser) throw new Error("Process failed. try again later");
  //return sucess messgae
  return "password reset sucessfully";
};

const changePassword = async (payload) => {
  const { email, oldPassword, newPassword } = payload;
  if (!email || !oldPassword || !newPassword)
    throw new Error("Something is missing");
  const user = await userModel.findOne({ email, isActive: true });
  if (!user) throw new Error("User not found");
  const isValidOldPw = comparePassword(oldPassword, user.password);
  if (!isValidOldPw) throw new Error("Password didn't match");
  const updateUser = await userModel.updateOne(
    { email },
    { password: hashPassword(newPassword) }
  );
  if (!updateUser) throw new Error("Try again later");
  return "Password changed successfully";
};

const resetPassword = async (payload) => {
  const { email, newPassword } = payload;
  if (!email || !newPassword) throw new Error("something is missing");
  const user = await userModel.findOne({ email, isactive: true });
  if (!user) throw new Error(" User not found");
  const updateUser = await userModel.updateOne(
    { email },
    { password: hashPassword(newPassword) }
  );
  if (!updateUser) throw new Error("Try again later");
  return "password reset sucessfully";
};
const blockUser = async (payload) => {
  const { email } = payload;
  const user = await userModel.findOne({ email });
  if (!user) throw new Error("User not found");
  const status = { isActive: !user?.isActive };
  const updateUser = await userModel.updateOne({ email }, status);
  if (!updateUser) throw new Error("Try again later");
  return `User ${status?.isActive ? "unblocked" : "blocked"} successfully`;
};

const getProfile = (_id) => {
  return userModel.findOne({ _id, isActive: true }).select("-password");
};

const updateProfile = (_id, payload) => {
  const { roles, email, password, ...rest } = payload;
  return userModel.updateOne({ _id }, rest).select("-password");
};

module.exports = {
  create,
  list,
  getById,
  updateById,
  removeById,
  register,
  Login,
};
