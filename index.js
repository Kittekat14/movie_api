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
    genre: 'drama',
    description: 'The life stories of the six men who raised the flag at the Battle of Iwo Jima, a turning point in World War II.',
    actors: ['Ryan Phillippe', 'Barry Pepper', 'Joseph Cross'],
    director: 'Clint Eastwood'
  },
  {
    id: 2,
    title: 'Back to the Future',
    year: 1985,
    genre: 'comedy',
    description: 'Marty McFly, a 17-year-old high school student, is accidentally sent thirty years into the past in a time-traveling DeLorean invented by his close friend, the eccentric scientist Doc Brown.',
    actors: ['Michael J. Fox', 'Christopher Lloyd', 'Lea Thompson'],
    director: 'Robert Zemeckis'
  },
  {
    id: 3,
    title: 'Cast Away',
    year: 2000,
    genre: 'adventure',
    description: 'A FedEx executive undergoes a physical and emotional transformation after crash landing on a deserted island.',
    actors: ['Tom Hanks', 'Helen Hunt', 'Paul Sanchez'],
    director: 'Robert Zemeckis'
  },
  {
    id: 4,
    title: 'Milk',
    year: 2008,
    genre: 'biography',
    description: 'The story of Harvey Milk and his struggles as an American gay activist who fought for gay rights and became California\'s first openly gay elected official.',
    actors: ['Sean Penn', 'Emile Hirsch', 'Josh Brolin'],
    director: 'Gus Van Sant'
  },
  {
    id: 5,
    title: 'The Big Short',
    year: 2015,
    genre: 'drama',
    description: 'In 2006-2007 a group of investors bet against the US mortgage market. In their research, they discover how flawed and corrupt the market is.',
    actors: ['Christian Bale', 'Steve Carell', 'Ryan Gosling'],
    director: 'Adam McKay'
  },
  {
    id: 6,
    title: 'The Wolf of Wall Street',
    year: 2013,
    genre: 'crime',
    description: 'Based on the true story of Jordan Belfort, from his rise to a wealthy stock-broker living the high life to his fall involving crime, corruption and the federal government.',
    actors: ['Leonardo DiCaprio', 'Jonah Hill', 'Margot Robbie'],
    director: 'Martin Scorsese'
  },
  {
    id: 7,
    title: 'Yesterday',
    year: 2019,
    genre: 'comedy',
    description: 'A struggling musician realizes he\'s the only person on Earth who can remember The Beatles after waking up in an alternate timeline where they never existed.',
    actors: ['Himesh Patel', 'Lily James', 'Sophia Di Martino'],
    director: 'Danny Boyle'
  },
  {
    id: 8,
    title: 'Parasite',
    year: 2019,
    genre: 'thriller',
    description: 'Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.',
    actors: ['Kang-ho Song', 'Sun-kyun Lee', 'Yeo-jeong Cho'],
    director: 'Bong Joon Ho'
  },
  {
    id: 9,
    title: 'Patriots Day',
    year: 2016,
    genre: 'crime',
    description: 'The story of the 2013 Boston Marathon bombing and the aftermath, which includes the city-wide manhunt to find the terrorists responsible.',
    actors: ['Mark Wahlberg', 'Michelle Monaghan', 'J.K. Simmons'],
    director: 'Peter Berg'
  },
  {
    id: 10,
    title: 'Deepwater Horizon',
    year: 2016,
    genre: 'action',
    description: 'A dramatization of the disaster in April 2010, when the offshore drilling rig called the Deepwater Horizon exploded, resulting in the worst oil spill in American history.',
    actors: ['Mark Wahlberg', 'Kurt Russell', 'Douglas M. Griffin'],
    director: 'Peter Berg'
  },
];
let users = [
  {
  username: 'Kittekat14',
  email: 'katrin_hofstetter@gmx.de',
  favorites: ['Minions', 'Pets', 'Zoomania', 'Kung Fu Panda', 'Madagascar']
  },
  {
  username: 'Huffipuff13',
  email: 'lisa_weber@web.de',
  favorites: []
  },
  {
  username: 'Pete1973',
  email: 'peter_schmidt@gmail.com',
  favorites: []
  },

];
let directors = [
  {
    name: 'Steven Spielberg',
    bio: 'Steven Allan Spielberg is an American film director, producer, and screenwriter. He began his career in the New Hollywood era, and is one of the most commercially successful directors in history.'
  },
  {
    name: 'Robert Zemeckis',
    bio: 'Robert Lee Zemeckis is an American film director, film producer, and screenwriter who is frequently credited as an innovator in visual effects. He first came to public attention as the director of Romancing the Stone (1984) and the science-fiction comedy Back to the Future, as well as the live-action/animated comedy Who Framed Roger Rabbit (1988).'
  },
  {
    name: 'Martin Scorsese',
    bio: 'Martin Charles Scorsese is an American film director, producer, screenwriter, and actor. One of the major figures of the New Hollywood era, he is widely regarded as one of the greatest and most influential directors in film history.'
  },
];
let genres = [
  {
    name: 'action',
    description: 'Movies in the action genre are fast-paced and include a lot of action like fight scenes, chase scenes, and slow-motion shots. They can feature superheroes, martial arts, or exciting stunts. '
  },
  {
    name: 'adventure',
    description: 'The adventure genre is so similar to the action genre that adventure films are often categorized as action/adventure movies. They are usually set in an exotic, far away, or unfamiliar locale. '
  },
  {
    name: 'drama',
    description: 'The drama genre features stories with high stakes and a lot of conflicts. They’re plot-driven and demand that every character and scene move the story forward. '
  },
];

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

// POST Methods 
// Creating new User Account by username
app.post('/users', (req, res) => {
  const newUser = req.body;
  if (!newUser.username) {
    const message = 'Missing Username in Request Body!';
    res.status(400).send(message);
  } else {
    newUser.id = uuid.v4();
    users.push(newUser);
    res.status(201).send(`${newUser.username}, you have sucessfully created a new account.`);
  }
});

//PUT Request
// Changing username
app.put('/users/:username', (req, res) => {
  let newUsername = req.body;
  if(!newUsername.username){
    const message = 'Missing new Username in the Request Body';
    res.status(400).send(message);
  } else {
    res.status(201).send(`You successfully changed your username to ${newUsername.username}.`);
  }
});


// DELETE Requests
// Deleting user by username
app.delete('/users/:username', (req, res) => {
  // user with right username is stored in variable let userToDelete
  let userToDelete = users.find((user) => { return user.username === req.params.username });

  if (!userToDelete) {
    const message = 'There is no user with this username.';
    res.status(400).send(message);
  } else {
    users = users.filter(u => { return u.username !== req.params.username });
    res.status(201).send(`The user with the username ${userToDelete.username} has been deleted.`);
  }
});

// NOT Working :
// Deleting movie from list of favorites
app.delete('/users/:username/favorites/:title', (req, res) => {
  let movieToDelete = favorites.find((movie) => { return movie === req.params.title });
  if (!movieToDelete) {
    const message = 'There is no movie with this title in the favorites list.';
    res.status(400).send(message);
  } else {
    res.status(201).send(`The movie with the title ${movieToDelete} has been deleted.`);
  }
});
// Adding new movie to list of favorite movies (NEW with PATCH) 
app.patch('/users/:username', (req, res) => {
  let favorite = req.body;
  if (!favorite.title) {
    const message = 'Missing Favorite Movie Title in Request Body!';
    res.status(400).send(message);
  } else {
    favorites.push(favorite);
    res.status(201).send(`The movie with the title ${favorite.title} has been added to your list of favorite movies.`);
  }
});


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
app.listen(8080, () => {
  console.log('Your App is listening on Port 8080');
});