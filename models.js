const { toInteger } = require('lodash');
const mongoose = require('mongoose');

let movieSchema = mongoose.Schema({
  movieid: Number,
  title: {type: String, required: true},
  description: {type: String, required: true},
  genre: {type: mongoose.Schema.Types.ObjectId, ref: 'Genre'},
  director: {type: mongoose.Schema.Types.ObjectId, ref: 'Director'},
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

let genreSchema = mongoose.Schema({
  name: {type: String, required: true},
  description: String
});

let directorSchema = mongoose.Schema({
  name: {type: String, required: true},
  bio: String,
  birthyear: String,
  movies: [String]
});


let Movie = mongoose.model('Movie', movieSchema); // creation of models: you name it ('Movie' or 'User') first and then point to the created variable 
let User = mongoose.model('User', userSchema);
let Genre = mongoose.model('Genre', genreSchema);
let Director = mongoose.model('Director', directorSchema);

module.exports.Movie = Movie;
module.exports.User = User;
module.exports.Genre = Genre;
module.exports.Director = Director;
