require("dotenv").config();
const data = require("./data");

const mongoose = require("mongoose");
const blogController = require("../modules/blogs/blog.controller");

const user1 = "65dee915bafffec2eb0ecca3";
const user2 = "65dee95ebafffec2eb0ecca6";

const setup = {
  initialize: async () => {
    try {
      console.log("Starting Blog Seeding");
      console.log(data.length);
      await mongoose.connect("mongodb://localhost:27017/blog-app-530");
      for (let i = 0; i < 10; i++) {
        const payload = data[i];
        payload.status = "published";
        payload.author = user1;
        payload.pictureUrl = `https://cdn.dummyjson.com/recipe-images/${
          i + 1
        }.webp`;
        await blogController.create(payload);
        console.log("seeding data", data[i]);
      }
      for (let i = 10; i < 20; i++) {
        const payload = data[i];
        payload.author = user2;
        payload.status = "published";
        payload.pictureUrl = `https://cdn.dummyjson.com/recipe-images/${
          i + 1
        }.webp`;
        await blogController.create(payload);
        console.log("seeding data", data[i]);
      }

      console.log("Completed Blog Seeding");
    } catch (e) {
      console.log({ e });
    }
  },
};

setup.initialize();
