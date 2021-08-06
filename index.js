const express = require('express'),
morgan = require('morgan'),
bodyParser = require('body-parser'),
uuid = require('uuid');

const app = express();

app.use(express.json());
app.use(morgan('common'));
app.use(express.static('public'));

app.use(bodyParser.urlencoded({
  extended: true
}));

let movies = [
  {
    id: 1,
    title: 'Flags of our Fathers',
    year: 2006,
    genre: ['action', 'adventure', 'drama'],
    description: 'The life stories of the six men who raised the flag at the Battle of Iwo Jima, a turning point in World War II.',
    actors: ['Ryan Phillippe', 'Barry Pepper', 'Joseph Cross'],
    director: 'Clint Eastwood'
  },
  {
    id: 2,
    title: 'Forrest Gump',
    year: 1994,
    genre: ['drama', 'romance'],
    description: 'The presidencies of Kennedy and Johnson, the Vietnam War, the Watergate scandal and other historical events unfold from the perspective of an Alabama man with an IQ of 75, whose only desire is to be reunited with his childhood sweetheart.',
    actors: ['Tom Hanks', 'Robin Wright', 'Gary Sinise'],
    director: 'Robert Zemeckis'
  },
  {
    id: 3,
    title: 'Cast Away',
    year: 2000,
    genre: ['adventure', 'drama', 'romance'],
    description: 'A FedEx executive undergoes a physical and emotional transformation after crash landing on a deserted island.',
    actors: ['Tom Hanks', 'Helen Hunt', 'Paul Sanchez'],
    director: 'Robert Zemeckis'
  },
  {
    id: 4,
    title: 'Milk',
    year: 2008,
    genre: ['biography', 'drama'],
    description: 'The story of Harvey Milk and his struggles as an American gay activist who fought for gay rights and became California\'s first openly gay elected official.',
    actors: ['Sean Penn', 'Emile Hirsch', 'Josh Brolin'],
    director: 'Gus Van Sant'
  },
  {
    id: 5,
    title: 'The Big Short',
    year: 2015,
    genre: ['drama', 'biography', 'comedy'],
    description: 'In 2006-2007 a group of investors bet against the US mortgage market. In their research, they discover how flawed and corrupt the market is.',
    actors: ['Christian Bale', 'Steve Carell', 'Ryan Gosling'],
    director: 'Adam McKay'
  },
  {
    id: 6,
    title: 'The Wolf of Wall Street',
    year: 2013,
    genre: ['biography', 'crime', 'drama'],
    description: 'Based on the true story of Jordan Belfort, from his rise to a wealthy stock-broker living the high life to his fall involving crime, corruption and the federal government.',
    actors: ['Leonardo DiCaprio', 'Jonah Hill', 'Margot Robbie'],
    director: 'Martin Scorsese'
  },
  {
    id: 7,
    title: 'Yesterday',
    year: 2019,
    genre: ['comedy', 'fantasy', 'music'],
    description: 'A struggling musician realizes he\'s the only person on Earth who can remember The Beatles after waking up in an alternate timeline where they never existed.',
    actors: ['Himesh Patel', 'Lily James', 'Sophia Di Martino'],
    director: 'Danny Boyle'
  },
  {
    id: 8,
    title: 'Parasite',
    year: 2019,
    genre: ['comedy', 'drama', 'thriller'],
    description: 'Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.',
    actors: ['Kang-ho Song', 'Sun-kyun Lee', 'Yeo-jeong Cho'],
    director: 'Bong Joon Ho'
  },
  {
    id: 9,
    title: 'Patriots Day',
    year: 2016,
    genre: ['action', 'crime', 'drama'],
    description: 'The story of the 2013 Boston Marathon bombing and the aftermath, which includes the city-wide manhunt to find the terrorists responsible.',
    actors: ['Mark Wahlberg', 'Michelle Monaghan', 'J.K. Simmons'],
    director: 'Peter Berg'
  },
  {
    id: 10,
    title: 'Deepwater Horizon',
    year: 2016,
    genre: ['action', 'drama', 'history'],
    description: 'A dramatization of the disaster in April 2010, when the offshore drilling rig called the Deepwater Horizon exploded, resulting in the worst oil spill in American history.',
    actors: ['Mark Wahlberg', 'Kurt Russell', 'Douglas M. Griffin'],
    director: 'Peter Berg'
  },
];

//GET Methods
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
    res.status(200).send(movie);
  }
})
//GET directors by name
app.get('/directors/:name', (req,res) => {
  const director = directors.find(d => d.name === req.params.name);
  if(!director) {
    res.status(404).send('The director with this name was not found.');
  } else {
    res.status(200).send(director);
  }
})
//GET genres by name
app.get('/genres/:name', (req,res) => {
  const genre = genres.find(g => g.name === req.params.name);
  if(!genre) {
    res.status(404).send('The genre with this name was not found.');
  } else {
    res.status(200).send(genre);
  }
})

// POST Methods
// Creating a new User Account
app.post('/users/:username', (req, res) => {
  const newUser = req.params.username;
  if (!newUser) {
    const message = 'Missing Username in request body';
    res.status(400).send(message);
  } else {
    newUser.id = uuid.v4();
    users.push(newUser);
    res.status(201).send(newUser);
  }
});

// Creating a new Movie Playlist
app.post('/users/playlists', (req, res) => {
  const newPlaylist = req.body;
  if (!newPlaylist) {
    const message = 'Missing Playlist Title or at least one Movie in request body';
    res.status(400).send(message);
  } else {
    newPlaylist.id = uuid.v4();
    playlists.push(newPlaylist);
    res.status(201).send(newPlaylist);
  }
});



app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
app.listen(8080, () => {
  console.log('Your App is listening on Port 8080');
});