const { Schema, model } = require("mongoose");

const blogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true,
        unique: true // Ensures slugs are unique
    },
    author: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum:["draft", "published"],
        default:"draft",
        required:true
    },
    content: {
        type: String,
        required: true
    },
pictureUrl:{ type :String},
duration:{ type: Number , min: 1},
});
    
module.exports = new model("blog" ,blogSchema);