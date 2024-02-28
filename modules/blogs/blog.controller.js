const blogModel = require("./blog.model");
const { generateSlug } = require("../../utils/textParser");

//create
const create = (payload) => {
  payload.slug = generateSlug(payload.title);
  return blogModel.create(payload);
};

const list = () => {
  //pagination
  //objectid
  //aggregation
  return blogModel.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "author",
        foreignField: "_id",
        as: "author",
      },
    },
    {
      $unwind: {
        path: "$author",
        preserveNullAndEmptyArrays: false,
      },
    },
    {
      $project: {
        author: "$author.name",
        title: 1,
        slug: 1,
        content: 1,
        status: 1,
        duration: 1,
        createdAt: 1,
        updatedAt: 1,
        _id: 0,
      },
    },
  ]);
};

module.exports = { create, list };
