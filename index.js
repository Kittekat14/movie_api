const express = require('express');
const morgan = require('morgan');
const uuid = require('uuid');
const app = express();
app.use(express.json());
app.use(morgan('common'));
app.use(express.static('public'));

const cors = require('cors');
app.use(cors());

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

let auth = require('./auth.js')(app);
const passport = require('passport');
require('./passport');


const { check, validationResult } = require('express-validator');

const mongoose = require('mongoose');
const Models = require('./models.js');
const Movies = Models.Movie;
const Users = Models.User;
const Genres = Models.Genre;
const Directors = Models.Director;

//mongoose.connect('mongodb://localhost:27017/ActorInspector', { useNewUrlParser: true, useUnifiedTopology: true });
//mongoose.connect('mongodb+srv://katrinhofstetter:<password>@mycreations.zttet.mongodb.net/ActorInspector?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
/**
 * mongoose business layer connection to mongoDB cluster and my ActorInspector database
 */
mongoose.connect( process.env.CONNECTION_URI, { useNewUrlParser: true, useUnifiedTopology: true });

/**
 * GET Requests 
 */
/**
 * GET homepage and list of all movies in JSON  
 */ 
app.get('/', (req, res) => {
  res.send('<h1>Welcome to ActorInspector, the best movie database!</h1>');
});

/**
 *  GET movie by title 
 * @method GET
 * @param {string} endpoint - Endpoint for fetching all movie from API --> "BASEURL/movies"
 * @returns {object} - Returns all movies as objects
 * 
 */
app.get('/movies', passport.authenticate('jwt', { session: false }), (req, res) => {
  Movies.find()
  .populate('genre')
  .populate('director')
    .then((movies) => {
      res.status(201).json(movies);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Error: ' + error);
    });
})

/**
 *  GET movie by title 
 * @method GET
 * @param {string} endpoint - Endpoint to fetch a specific movie with its properties 
 * over title property --> "BASEURL/movies/:title"
 * @returns {object} - Returns specific movie as object
 * 
 */
app.get('/movies/:title', passport.authenticate('jwt', { session: false }), (req,res) => {
  Movies.findOne({title: req.params.title})
  .then((movie) => {
    res.status(201).json(movie);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send('Error: ' + err);
  });
})

/**
 * Get all directors
 * @method GET
 * @param {string} endpoint - Endpoint to fetch all directors: "BASEURL/directors"
 * @returns {object} - Returns the directors as objects
 */
app.get('/directors', passport.authenticate('jwt', { session: false }), (req,res) => {
  Directors.find()
    .then((director) => {
      res.status(200).json(director);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
})

/**
 *  GET director by name 
 * @method GET
 * @param {string} route to director with a certain name in the params --> "BASEURL/directors/:name"
 * @returns {object} - Returns specific director as object
 * 
 */
app.get('/directors/:name', passport.authenticate('jwt', { session: false }), (req,res) => {
  Directors.findOne({
    name: req.params.name
  })
  .then((director) => {
    res.json(director);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send('Error: ' + err);
  });
})

/**
 * Get all genres
 * @method GET
 * @param {string} endpoint - Endpoint to fetch all genres: "BASEURL/genres"
 * @returns {object} - Returns the genres as objects
 */
app.get('/genres', passport.authenticate('jwt', { session: false }), (req,res) => {
  Genres.find()
    .then((genre) => {
      res.status(200).json(genre);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).sned('Error: ' + err);
    });
})

/**
 *  GET genre by genre name 
 * @method GET
 * @param {string} route to genre over its name in the params --> "BASEURL/genres/:name"
 * @returns {object} - Returns specific genre as object
 * 
 */
app.get('/genres/:name', passport.authenticate('jwt', { session: false }), (req,res) => {
  Genres.findOne({
    name: req.params.name
  })
  .then((genre) => {
    res.json(genre);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send('Error: ' + err);
  });
})

/**
 * Get all users in the database
 * @method GET
 * @param {string} endpoint - Endpoint to fetch all users: "BASEURL/users"
 * @returns {object} - Returns all the users as objects
 */
app.get('/users', passport.authenticate('jwt', { session: false }), (req, res) => {
  Users.find()
  .populate('favorites', 'title')
    .then((users) => {
      res.status(201).json(users);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

/**
 *  GET user by username 
 * @method GET
 * @param {string} route to user with a specific username over the params --> "BASEURL/users/:username"
 * @returns {object} - Returns specific user as object
 * 
 */
app.get('/users/:username', passport.authenticate('jwt', { session: false }), (req, res) => {
  Users.findOne({ username: req.params.username })
    .populate("favorites", "title")
      .then((user) => {
        res.status(201).json(user);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error: " + err);
      });
});


/**
 *  POST a new user to database 
 * @method POST
 * @param {string} route to all users --> "BASEURL/users"
 * @param {array} validation checks, server-side
 * @returns {object} - Returns the newly created user object
 * 
 */
app.post('/users', [
check('username', 'Username must at least consist of 5 characters.').isLength({min: 5}), 
check('username', 'Username contains non alphanumeric and therefore not allowed characters.').isAlphanumeric(),
check('password', 'Password cannot be empty').not().isEmpty(), 
check('email', 'Email does not appear to be valid').isEmail()
], (req, res) => {
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({errors: errors.array()});
  };
  let hashedPassword = Users.hashPassword(req.body.password);
  Users.findOne({username: req.body.username})
  .then((user) => {
    if(user) {
      return res.status(400).send(req.body.username + ' already exists.');
    } else {
      Users.create({
        username: req.body.username,
        password: hashedPassword,
        email: req.body.email,
        birthdate: req.body.birthdate
      })
      .then((user) => {
        res.status(201).json(user) })
      .catch((error) => {
        console.error(error);
        res.status(500).send('Error: ' + error);
      })
    }
  })
  .catch((error) => {
    console.error(error);
    res.status(500).send('Error: ' + error);
  })
})  

/**
 * Update user details
 * @method PUT
 * @param {string} endpoint - Endpoint to update specific user over his username in params
 */
app.put('/users/:username', [
  check('username', 'Username must at least consist of 5 characters.').isLength({min: 5}), 
  check('username', 'Username contains non alphanumeric and therefore not allowed characters.').isAlphanumeric()
], passport.authenticate('jwt', { session: false }), (req, res) => {
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({errors: errors.array()});
  }
  Users.findOneAndUpdate({ username: req.params.username }, 
  { 
    $set: {
      username: req.body.username,
      password: Users.hashPassword(req.body.password),
      email: req.body.email,
      birthdate: req.body.birthdate
    }
  },
  { new: true },
  (err, updatedUser) => {
    if(err) {
      console.error(err);
      res.status(500).send('Error: ' + err);
    } else {
      res.json(updatedUser);
    }
  });
})


/**
 * Get all favorites of a specific user
 * @method GET
 * @param {string} endpoint - Endpoint to fetch favorites over params: "BASEURL/users/:username/favorites"
 * @returns {object} - Returns the favorites of a certain user as objects
 */ 
app.get('/users/:username/favorites', passport.authenticate('jwt', { session: false }), (req, res) => {
 Users.findOne({ username: req.params.username })
   .populate("favorites", "title")
   .then((user) => {
     res.status(201).json(user);
   })
   .catch((err) => {
     console.error(err);
     res.status(500).send("Error: " + err);
   });
});

/**
 *  POST movie to one user's favorites 
 * @method POST
 * @param {string} route to user over username in the params --> "BASEURL/users/:username"
 * @param {string} route to favorites array inside a user object and adding movieid over the params 
 * --> "BASEURL/users/:username/favorites/:movieid"
 * @returns {object} - Returns user object with new favorites array
 * 
 */
app.post('/users/:username/favorites/:movieid', passport.authenticate('jwt', { session: false }), (req, res) => {
  Users.findOneAndUpdate({ username: req.params.username}, 
    {
     $push: { favorites: req.params.movieid } 
    },
   { new: true },
  (err, updatedUser) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error: ' + err);
    } else {
      res.json(updatedUser);
    }
  });
});



/** 
 * DELETE Requests 
 * 
 */ 

/**
 *  DELETE movie from one user's favorites 
 * @method DELETE
 * @param {string} route to user over username in the params --> "BASEURL/users/:username"
 * @param {string} route to favorites array inside a user object and deleting movieid over the params 
 * --> "BASEURL/users/:username/favorites/:movieid"
 * @returns {object} - Returns user object with new favorites array
 * 
 */ 
app.delete('/users/:username/favorites/:movieid', passport.authenticate('jwt', { session: false }), (req,res) => {
  Users.findOneAndUpdate ({ 
    username: req.params.username
  },
  {
    $pull: { favorites: req.params.movieid } 
  },
  {
    new: true
  },
  (err, updatedUser) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error: ' + err);
    } else {
      res.json(updatedUser);
    }
  });
});

/**
 *  DELETE single user over username
 * @method DELETE
 * @param {string} route to user over username in the params --> "BASEURL/users/:username"
 * @returns {string} - Returns message about deletion
 * 
 */  
app.delete('/users/:username', passport.authenticate('jwt', { session: false }), (req, res) => {
  Users.findOneAndRemove({ username: req.params.username })
  .then((user) => {
    if(!user) {
      res.status(400).send(req.params.username + ' was not found.');
    } else {
      res.status(200).send(req.params.username + ' was deleted.')
    }
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send('Error: ' + err);
  });
}) 

/**
 *  General error message
 * 
 */ 
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

/**
 *  API can be used on port specified in environmental variables or 8080 (on any IP address)
 * 
 */ 
const port = process.env.PORT || 8080;
app.listen(port, '0.0.0.0',() => {
 console.log('Listening on Port ' + port);
});