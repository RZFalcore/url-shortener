const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  from: { type: String, required: true },
  to: { type: String, required: true, unique: true },
  code: { type: String, required: true, unique: true },
  date: { type: Date, default: Date.now },
  owner: { type: Schema.Types.ObjectId, ref: "User" },
  clicks: {
    type: Number,
    default: 0,
  },
});

module.exports = model("Link", userSchema);
