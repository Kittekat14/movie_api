const mongoose = require('mongoose');

let movieSchema = mongoose.Schema({
  title: {type: String, required: true},
  description: {type: String, required: true},
  genre: {
    name: String,
    description: String
  },
  director: {
    name: String,
    bio: String,
    birthyear: Date
  },
  actors: [String],
  imageUrl: String,
  featured: Boolean
});

let userSchema = mongoose.Schema({
  username: {type: String, required: true},
  password: {type: String, required: true},
  email: {type: String, required: true},
  birthdate: Date,
  favorites: [{type: mongoose.Schema.Types.ObjectId, ref: 'Movie'}]
});

let Movie = mongoose.model('Movie', movieSchema); // creation of models: you name it ('Movie' or 'User') first and then point to the created variable 
let User = mongoose.model('User', userSchema);

module.exports.Movie = Movie;
module.exports.User = User;

