const userModel = require("./user.model");

//create
const create = (payload) => {
    return userModel.create(payload);
};
 
//read part1 
const list = () =>{
    return userModel.find();
};

//read part 2
const geTById = (_Id) =>{
return userModel.findOne({_Id});
};

//update
const updateById = (_Id , payload) => {
    return userModel.updateByOne({_Id} , payload);
};

//delete
const removeById = (_Id) => {
    return userModel.deleteOne({ _Id});
};


module.exports = { create, list,geTById,updateById,removeById };