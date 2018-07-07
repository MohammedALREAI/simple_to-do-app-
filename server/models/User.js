const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 1
  }
});

let User = mongoose.model('User', UserSchema);
/*
  let newUser = new User({
    email: 'gbolahanolawuyi4u@gmail.com'
  });

  newUser.save()
    .then((doc) => {
      console.log('user saved', doc)
    }, (err) => {
      comsole.log('There was an error', err);
    });
*/

  module.exports = {User};