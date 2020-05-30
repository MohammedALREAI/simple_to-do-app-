const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
  },
});

let User = mongoose.model("User", UserSchema);

module.exports = { User };
