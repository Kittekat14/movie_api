const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const uuid = require('uuid');
const app = express();
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
const Directors = Models.Director;
const Genres = Models.Genre;

mongoose.connect('mongodb://localhost:27017/ActorInspector', { useNewUrlParser: true, useUnifiedTopology: true });

//GET Requests
// GET homepage and list of all movies in JSON //OK
app.get('/', (req, res) => {
  res.send('<h1>Welcome to ActorInspector, the best movie database!</h1>');
});

// GET all movies //OK
app.get('/movies', (req, res) => {
  Movies.find()
    .then((movies) => {
      res.status(201).json(movies);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});
//GET movies by title //OK
app.get('/movies/:title', (req,res) => {
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
app.get('/directors', (req,res) => {
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
app.get('/directors/:name', (req,res) => {
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
app.get('/genres', (req,res) => {
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
app.get('/genres/:name', (req,res) => {
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

// GET all users //OK
app.get('/users', (req, res) => {
  Users.find()
    .then((users) => {
      res.status(201).json(users);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});
// GET user by username // OK
app.get('/users/:username', (req, res) => {
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
app.post('/users', (req, res) => {
  Users.findOne({username: req.body.username})
  .then((user) => {
    if(user) {
      return res.status(400).send(req.body.username + ' already exists.');
    } else {
      Users.create({
        username: req.body.username,
        password: req.body.password,
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
app.put('/users/:username', (req, res) => {
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

// Add/Post movie to favorites by MovieId(=ObjectId) in params //NOT working
app.post('/users/:username/movies/:movieid', (req, res) => {
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
app.delete('/users/:username/favorites/:movieid', (req,res) => {
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

// Delete user by username //OK
app.delete('/users/:username', (req, res) => {
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
app.listen(8080, () => {
  console.log('Your App is listening on Port 8080');
});