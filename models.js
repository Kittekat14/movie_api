const mongoose = require('mongoose');

let movieSchema = mongoose.Schema({
  Title: {type: String, required: true},
  Description: {type: String, required: true},
  Genre: {
    Name: String,
    Description: String
  },
  Director: {
    Name: String,
    Bio: String,
    Birthyear: Date
  },
  Actors: [String],
  ImageUrl: String,
  Featured: Boolean
});

let userSchema = mongoose.Schema({
  Username: {type: String, required: true},
  Password: {type: String, required: true},
  Email: {type: String, required: true},
  Birthdate: Date,
  Favorites: [{ type: mongoose.Schema.Types.MovieId, ref: 'Movie' }]
});

let Movie = mongoose.model('Movie', movieSchema); //you name it ('Movie' or 'User') first and then point to the created variable 
let User = mongoose.model('User', userSchema);

module.exports.Movie = Movie;
module.exports.User = User;

