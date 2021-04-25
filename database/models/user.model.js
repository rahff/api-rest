const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const uniquValidators = require('mongoose-unique-validator');
const userSchema = new Schema({
  name: { type: String, require: true },
  firstname: { type: String, require: false },
  email: { type: String, require: true, unique: true},
  password: { type: String, require: true },
  avatar: { type: String, require: false },
  createdAt: { type: Date, default: Date.now() },
});

userSchema.plugin(uniquValidators);
module.exports = mongoose.model("User", userSchema);
