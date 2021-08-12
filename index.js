const express = require('express'),
morgan = require('morgan'),
bodyParser = require('body-parser'),
uuid = require('uuid'),
mongoose = require('mongoose');
const Models = require('./models.js');
const Movies = Models.Movie;
const Users = Models.User;

mongoose.connect('mongodb://localhost:27017/ActorInspector', { useNewUrlParser: true, useUnifiedTopology: true});

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.json());
app.use(morgan('common'));
app.use(express.static('public'));



//GET Requests
// GET homepage and list of all movies in JSON
app.get('/', (req, res) => {
  res.send('<h1>Welcome to ActorInspector, the best movie database!</h1>');
});

app.get('/movies', (req, res) => {
  res.json(movies);
});

//GET movies by title 
app.get('/movies/:title', (req,res) => {
  const movie = movies.find(m => m.title === req.params.title);
  if(!movie) {
    res.status(404).send('The movie with this same title was not found.');
  } else {
    res.status(200).json(movie);
  }
})
//GET directors by name
app.get('/directors/:name', (req,res) => {
  const director = directors.find(d => d.name === req.params.name);
  if(!director) {
    res.status(404).send('The director with this name was not found.');
  } else {
    res.status(200).json(director);
  }
})
//GET genres by name
app.get('/genres/:name', (req,res) => {
  const genre = genres.find(g => g.name === req.params.name);
  if(!genre) {
    res.status(404).send('The genre with this name was not found.');
  } else {
    res.status(200).json(genre);
  }
})

// POST and PUT Methods 
// Creating new User Account by username
app.post('/users', (req, res) => {
  Users.findOne( { Username: req.body.Username } )
  .then((user) => {
    if(user) {
      return res.status(400).send(req.body.Username + ' already exists.');
    } else {
      Users.create({
        Username: req.body.Username,
        Password: req.body.Password,
        Email: req.body.Email,
        Birthdate: req.body.Birthdate
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

// Updating username
app.put('/users/:Username', (req, res) => {
  Users.findOneAndUpdate({Username: req.params.Username}, 
    {$set: 
      {
      Username: req.body.Username,
      Password: req.body.Password,
      Email: req.body.Email,
      Birthdate: req.body.Birthdate
      }
    },
    {new:true} //makes sure that updated doc is returned
    .then((user) => {
      res.status(201).json(user) })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Error: ' + error);
    })
  )
})

// Adding movie to favorites [=array] over params
app.post('/users/:Username/movies/:MovieId', (req, res) => {
  Users.findOneAndUpdate({ Username: req.params.Username }, //first find the user
    {$push: {Favorites: req.params.MovieId} }, //then push a movieId to it's array of favorites
    {new: true} // makes sure that updated doc is returned
    .then((updatedUser) => {
      res.status(201).json(updatedUser)})
    .catch((error) => {
      console.error(error);
      res.status(500).send('Error: ' + error);
    })
  );
});


// DELETE Requests

// Remove movie from favorites by MovieId
app.delete('/users/:Username/movies/:MovieId', (req, res) => {
  Users.findOneAndUpdate({ Username: req.params.Username }, 
  {$pull: {Favorites: req.params.MovieId} },
    {new: true} // makes sure that updated document is returned
    .then((updatedUser) => {
      res.status(201).json(updatedUser)})
    .catch((error) => {
      console.error(error);
      res.status(500).send('Error: ' + error);
    })
  )
})

// Deleting user by Username
app.delete('/users/:Username', (req, res) => {
  Users.findOneAndRemove({ Username: req.params.Username })
  .then((user) => {
    if(!user) {
      res.status(400).send(req.params.Username + ' was not found.');
    } else {
      res.status(200).send(req.params.Username + ' was deleted.')
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