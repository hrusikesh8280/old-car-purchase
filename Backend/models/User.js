const mongoose = require("mongoose");


const userModelSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { required: true, type: String },
  date: { type: Date, default: Date.now },
  password: { required: true, type: String },

});

const UserModel = mongoose.model("user", userModelSchema);

module.exports = UserModel;