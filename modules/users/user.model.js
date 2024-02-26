const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    name: String,
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    roles: {
      type: [String],
      enum: ["admin", "user"],
      default: "user",
      required: true,
    },
    isActive: { type: Boolean, default: true, required: true },
    token:{ type: String ,}
  },
  { timestamps: true }
);

module.exports = new model("User", userSchema);
