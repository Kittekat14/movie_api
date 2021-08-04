const express = require('express'),
morgan = require('morgan');
uuid = require('uuid');
const app = express();

app.use(morgan('common'));
app.use(express.static('public'));


let movies = [
  {
    id: 1,
    title: 'Flags of our Fathers',
    director: 'Clint Eastwood'
  },
  {
    id: 2,
    title: 'Forrest Gump',
    director: 'Robert Zemeckis'
  },
  {
    id: 3,
    title: 'Cast Away',
    director: 'Robert Zemeckis'
  },
  {
    id: 4,
    title: 'Milk',
    director: 'Gus Van Sant'
  },
  {
    id: 5,
    title: 'The Big Short',
    director: 'Adam McKay'
  },
  {
    id: 6,
    title: 'The Wolf of Wall Street',
    director: 'Martin Scorsese'
  },
  {
    id: 7,
    title: 'Yesterday',
    director: 'Danny Boyle'
  },
  {
    id: 8,
    title: 'Parasite',
    director: 'Bong Joon Ho'
  },
  {
    id: 9,
    title: 'Boston',
    director: 'Peter Berg'
  },
  {
    id: 10,
    title: 'Deepwater Horizon',
    director: 'Peter Berg'
  },
];

app.get('/', (req, res) => {
  res.send('<h1>Welcome to ActorInspector, the best movie database!</h1>');
});

app.get('/public/documentation', (req, res) => {                  
  res.sendFile('public/documentation.html', { root: __dirname });
});

app.get('/movies', (req, res) => {
  res.json(movies);
});

app.get('/movies/:id', (req,res) => {
  const movie = movies.find(m => m.id === parseInt(req.params.id));
  if(!movie){
    res.status(404)send('The movie with this same ID was not found.');
  }
})
app.get('/movies/:title', (req,res) => {

})

app.post('/movies', (req, res) => {
  let newMovie = req.body;

  if (!newMovie.title) {
    const message = 'Missing title in request body';
    res.status(400).send(message);
  } else {
    newMovie.id = uuid.v4();
    movies.push(newMovie);
    res.status(201).send(newMovie);
  }
});

app.put('/movies', (req,res) => {
  res.send({ title: '', director: ''})
})



app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
app.listen(8080, () => {
  console.log('Your App is listening on Port 8080');
});