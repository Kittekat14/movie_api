const express = require('express');
const morgan = require('morgan');
const uuid = require('uuid');
const app = express();

const cors = require('cors');
app.use(cors());
const bodyParser = require('body-parser');

let auth = require('./auth.js')(app);
const passport = require('passport');
require('./passport');
const { check, validationResult } = require('express-validator');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.json());
app.use(morgan('common'));
app.use(express.static('public'));

const mongoose = require('mongoose');
const Models = require('./models.js');
const Movies = Models.Movie;
const Users = Models.User;
const Genres = Models.Genre;
const Directors = Models.Director;

//mongoose.connect('mongodb://localhost:27017/ActorInspector', { useNewUrlParser: true, useUnifiedTopology: true });
//mongoose.connect('mongodb+srv://katrinhofstetter:<password>@mycreations.zttet.mongodb.net/ActorInspector?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connect( process.env.CONNECTION_URI, { useNewUrlParser: true, useUnifiedTopology: true });

//GET Requests
// GET homepage and list of all movies in JSON
app.get('/', (req, res) => {
  res.send('<h1>Welcome to ActorInspector, the best movie database!</h1>');
});

// GET all movies
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

//GET movies by title 
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

//GET all directors
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

//GET directors by name 
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

//GET all genres
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

//GET genres by name
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

// GET all users 
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
// GET user by username 
app.get('/users/:username', passport.authenticate('jwt', { session: false }), (req, res) => {
  Users.findOne({ username: req.params.username })
    .then((user) => {
      res.status(201).json(user);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

// POST and PUT Requests 
// Creating new user by username
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

// Update username of a certain user
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
      password: req.body.password,
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

// Add/Post movie to favorites by MovieId(=ObjectId) in params
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

// DELETE Requests
// Delete movie from favorites by Movieid (=ObjectId) in params
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

// Delete user by username 
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


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const port = process.env.PORT || 8080;
app.listen(port, '0.0.0.0',() => {
 console.log('Listening on Port ' + port);
});