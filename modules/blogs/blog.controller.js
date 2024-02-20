const blogModel = require("./blog.model");



//create
const create = (payload) => {
    return blogModel.craete(payload);
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
  
  module.exports = { create, list, getById, updateById, removeById };
  

