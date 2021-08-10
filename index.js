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
    movieid: 1,
    title: 'Flags of our Fathers',
    year: 2006,
    genre: {
      name: 'drama',
      description: 'The drama genre features stories with high stakes and a lot of conflicts. They\'re plot-driven and demand that every character and scene move the story forward. Dramas follow a clearly defined narrative plot structure, portraying real-life scenarios or extreme situations with emotionally-driven characters.'
    },
    description: 'The life stories of the six men who raised the flag at the Battle of Iwo Jima, a turning point in World War II.',
    actors: ['Ryan Phillippe', 'Barry Pepper', 'Joseph Cross'],
    director: {
      name: 'Clint Eastwood',
      bio: 'Clinton Eastwood Jr. is an American actor, film director, composer, and producer. An Academy Award nominee for Best Actor, Eastwood won Best Director and Best Picture for his Western film Unforgiven (1992) and his sports drama Million Dollar Baby (2004).',
      birthdate: '1930-05-31'
    },
    imageUrl: 'https://www.imdb.com/title/tt0418689/mediaviewer/rm2742196480/?ref_=tt_ov_i',
    featured: false
  },
  {
    movieid: 2,
    title: 'Back to the Future',
    year: 1985,
    genre: 'comedy',
    description: 'Marty McFly, a 17-year-old high school student, is accidentally sent thirty years into the past in a time-traveling DeLorean invented by his close friend, the eccentric scientist Doc Brown.',
    actors: ['Michael J. Fox', 'Christopher Lloyd', 'Lea Thompson'],
    director: 'Robert Zemeckis',
    imageUrl: 'https://www.imdb.com/title/tt0088763/mediaviewer/rm554638848/?ref_=tt_ov_i',
    featured: true
  },
  {
    movieid: 3,
    title: 'Cast Away',
    year: 2000,
    genre: 'adventure',
    description: 'A FedEx executive undergoes a physical and emotional transformation after crash landing on a deserted island.',
    actors: ['Tom Hanks', 'Helen Hunt', 'Paul Sanchez'],
    director: 'Robert Zemeckis',
    imageUrl: 'https://www.imdb.com/title/tt0162222/mediaviewer/rm381427456/?ref_=tt_ov_i',
    featured: false
  },
  {
    movieid: 4,
    title: 'Milk',
    year: 2008,
    genre: 'biography',
    description: 'The story of Harvey Milk and his struggles as an American gay activist who fought for gay rights and became California\'s first openly gay elected official.',
    actors: ['Sean Penn', 'Emile Hirsch', 'Josh Brolin'],
    director: 'Gus Van Sant',
    imageUrl: 'https://www.imdb.com/title/tt1013753/mediaviewer/rm1538495488/?ref_=tt_ov_i',
    featured: true
  },
  {
    movieid: 5,
    title: 'The Big Short',
    year: 2015,
    genre: 'drama',
    description: 'In 2006-2007 a group of investors bet against the US mortgage market. In their research, they discover how flawed and corrupt the market is.',
    actors: ['Christian Bale', 'Steve Carell', 'Ryan Gosling'],
    director: 'Adam McKay',
    imageUrl: 'https://www.imdb.com/title/tt1596363/mediaviewer/rm3249474304/?ref_=tt_ov_i',
    featured: false
  },
  {
    movieid: 6,
    title: 'The Wolf of Wall Street',
    year: 2013,
    genre: 'crime',
    description: 'Based on the true story of Jordan Belfort, from his rise to a wealthy stock-broker living the high life to his fall involving crime, corruption and the federal government.',
    actors: ['Leonardo DiCaprio', 'Jonah Hill', 'Margot Robbie'],
    director: 'Martin Scorsese',
    imageUrl: 'https://www.imdb.com/title/tt0993846/mediaviewer/rm2842940160/?ref_=tt_ov_i',
    featured: false
  },
  {
    movieid: 7,
    title: 'Yesterday',
    year: 2019,
    genre: 'comedy',
    description: 'A struggling musician realizes he\'s the only person on Earth who can remember The Beatles after waking up in an alternate timeline where they never existed.',
    actors: ['Himesh Patel', 'Lily James', 'Sophia Di Martino'],
    director: 'Danny Boyle',
    imageUrl: 'https://www.imdb.com/title/tt8079248/mediaviewer/rm1175416320/?ref_=tt_ov_i',
    featured: true
  },
  {
    movieid: 8,
    title: 'Parasite',
    year: 2019,
    genre: 'thriller',
    description: 'Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.',
    actors: ['Kang-ho Song', 'Sun-kyun Lee', 'Yeo-jeong Cho'],
    director: 'Bong Joon Ho',
    imageUrl: 'https://www.imdb.com/title/tt6751668/mediaviewer/rm3194916865/?ref_=tt_ov_i',
    featured: false
  },
  {
    movieid: 9,
    title: 'Patriots Day',
    year: 2016,
    genre: 'crime',
    description: 'The story of the 2013 Boston Marathon bombing and the aftermath, which includes the city-wide manhunt to find the terrorists responsible.',
    actors: ['Mark Wahlberg', 'Michelle Monaghan', 'J.K. Simmons'],
    director: 'Peter Berg',
    imageUrl: 'https://www.imdb.com/title/tt4572514/mediaviewer/rm1786188800/?ref_=tt_ov_i',
    featured: false
  },
  {
    movieid: 10,
    title: 'Deepwater Horizon',
    year: 2016,
    genre: 'action',
    description: 'A dramatization of the disaster in April 2010, when the offshore drilling rig called the Deepwater Horizon exploded, resulting in the worst oil spill in American history.',
    actors: ['Mark Wahlberg', 'Kurt Russell', 'Douglas M. Griffin'],
    director: 'Peter Berg',
    imageUrl: 'https://www.imdb.com/title/tt1860357/mediaviewer/rm3273657088/?ref_=tt_ov_i',
    featured: false
  },
  {
    movieid: 11,
    title: 'Shutter Island',
    year: 2010,
    genre: 'thriller',
    description: 'In 1954, a U.S. Marshal investigates the disappearance of a murderer who escaped from a hospital for the criminally insane.',
    actors: ['Leonardo Di Caprio', 'Emily Mortimer', 'Mark Ruffalo'],
    director: 'Martin Scorsese',
    imageUrl: 'https://www.imdb.com/title/tt1130884/mediaviewer/rm1814907136/?ref_=tt_ov_i',
    featured: false
  },
  {
    movieid: 12,
    title: 'Catch Me If You Can',
    year: 2002,
    genre: 'biography',
    description: 'Barely 21 yet, Frank is a skilled forger who has passed as a doctor, lawyer and pilot. FBI agent Carl becomes obsessed with tracking down the con man, who only revels in the pursuit.',
    actors: ['Leonardo Di Caprio', 'Tom Hanks', 'Amy Adams'],
    director: 'Steven Spielberg',
    imageUrl: 'https://www.imdb.com/title/tt0264464/mediaviewer/rm3911489536/?ref_=tt_ov_i',
    featured: false
  },
  {
    movieid: 13,
    title: 'Jexi',
    year: 2019,
    genre: 'comedy',
    description: 'Phil makes top 10 pop lists at work. His only "friend" is cellphone Siri. His new phone includes AI helper Jexi, who improves/controls his social life.',
    actors: ['Adam Devine', 'Alexandra Shipp', 'Rose Byrne'],
    director: 'Jon Lucas',
    imageUrl: 'https://www.imdb.com/title/tt9354944/mediaviewer/rm219780609/?ref_=tt_ov_i',
    featured: false
  },
  {
    movieid: 14,
    title: 'Forrest Gump',
    year: 1994,
    genre: 'romance',
    description: 'The presidencies of Kennedy and Johnson, the Vietnam War, the Watergate scandal and other historical events unfold from the perspective of an Alabama man with an IQ of 75, whose only desire is to be reunited with his childhood sweetheart.',
    actors: ['Tom Hanks', 'Robin Wright', 'Gary Sinise'],
    director: 'Robert Zemeckis',
    imageUrl: 'https://www.imdb.com/title/tt0109830/mediaviewer/rm1954748672/?ref_=tt_ov_i',
    featured: true
  },
  {
    movieid: 15,
    title: 'Knives Out',
    year: 2020,
    genre: 'crime',
    description: 'A detective investigates the death of a patriarch of an eccentric, combative family.',
    actors: ['Daniel Craig', 'Chris Evans', 'Jamie Lee Curtis'],
    director: 'Rian Johnson',
    imageUrl: 'https://www.imdb.com/title/tt8946378/mediaviewer/rm2569376769/?ref_=tt_ov_i',
    featured: true
  },
  {
    movieid: 16,
    title: 'Slumdog Millionaire',
    year: 2008,
    genre: 'drama',
    description: 'A Mumbai teenager reflects on his life after being accused of cheating on the Indian version of "Who Wants to be a Millionaire?".',
    actors: ['Dev Patel', 'Freida Pinto', 'Saurabh Shukla'],
    director: 'Danny Boyle',
    imageUrl: 'https://www.imdb.com/title/tt1010048/mediaviewer/rm2952200704/?ref_=tt_ov_i',
    featured: true
  }
];
let users = [
  {
    _id: 1,
    username: 'Kittekat14',
    password: 'GinTonic8080',
    email: 'katrin_hofstetter@gmx.de',
    birthdate: new Date('1992-06-29'),
    favorites: ['Cast Away', 'Forrest Gump', 'Yesterday']
  },
  {
    _id: 2,
    username: 'Huffipuff13',
    password: 'harrypotter90',
    email: 'lisa_weber@web.de',
    birthdate: new Date('2000-08-20'),
    favorites: [1, 5, 6]
  },
  {
    _id: 3,
    username: 'Pete1973',
    password: 'Elisabeth89',
    email: 'peter_schmidt@gmail.com',
    birthdate: new Date('1973-04-30'),
    favorites: [16, 11, 4]
  },
  {
    _id: 4,
    username: 'Paettypaett92',
    password: 'RamazottiRosato',
    email: 'patricia92@web.de',
    birthdate: new Date('1992-08-28'),
    favorites: [4, 16, 8, 5]
  },
  {
    _id: 5,
    username: 'Giraffenküken',
    password: 'Daughtry089',
    email: 'simone_kefer@gmail.com',
    birthdate: new Date('1992-07-09'),
    favorites: [5, 11, 1]
  },
  {
    _id: 6,
    username: 'Mariano2709',
    password: 'netflix2019',
    email: 'marianoZA1984@gmail.com',
    birthdate: new Date('1984-09-27'),
    favorites: [9, 10, 11]
  }
];
let directors = [
  {
    name: 'Steven Spielberg',
    bio: 'Steven Allan Spielberg is an American film director, producer, and screenwriter. He began his career in the New Hollywood era, and is one of the most commercially successful directors in history.',
    birthyear: '1946'
  },
  {
    name: 'Clint Eastwood',
    bio: 'Clinton Eastwood Jr. is an American actor, film director, composer, and producer. An Academy Award nominee for Best Actor, Eastwood won Best Director and Best Picture for his Western film Unforgiven (1992) and his sports drama Million Dollar Baby (2004).',
    birthyear: '1930'
  },
  {
    name: 'Robert Zemeckis',
    bio: 'Robert Lee Zemeckis is an American film director, film producer, and screenwriter who is frequently credited as an innovator in visual effects. He first came to public attention as the director of Romancing the Stone (1984) and the science-fiction comedy Back to the Future, as well as the live-action/animated comedy Who Framed Roger Rabbit (1988).',
    birthyear: '1951'
  },
  {
    name: 'Martin Scorsese',
    bio: 'Martin Charles Scorsese is an American film director, producer, screenwriter, and actor. One of the major figures of the New Hollywood era, he is widely regarded as one of the greatest and most influential directors in film history.',
    birthyear: '1942'
  },
  {
    name: 'Gus Van Sant',
    bio: 'Gus Green Van Sant Jr. is an American film director, screenwriter, painter, photographer, musician, and author who has earned acclaim as both an independent and mainstream filmmaker. His films typically deal with themes of marginalized subcultures, in particular homosexuality.',
    birthyear: '1952'
  },
  {
    name: 'Adam McKay',
    bio: 'Adam McKay is an American film and television director, producer, screenwriter, and comedian. McKay began his career in the 1990s as a head writer for the NBC sketch comedy show Saturday Night Live for two seasons and is the co-founder of the Upright Citizens Brigade.',
    birthyear: '1968'
  },
  {
    name: 'Danny Boyle',
    bio: 'Daniel Francis Boyle is an English film, television, and stage director and producer. He is known for his work on films including Shallow Grave, Trainspotting, The Beach, 28 Days Later, Sunshine, Slumdog Millionaire, 127 Hours, Steve Jobs and Yesterday.',
    birthyear: '1956'
  },
  {
    name: 'Peter Berg',
    bio: 'Peter Berg is an American actor, director, writer, and producer. His directorial film works include the black comedy Very Bad Things (1998), the action comedy The Rundown (2003), the sports drama Friday Night Lights (2004), the action thriller The Kingdom (2007), the superhero comedy-drama Hancock (2008), the military science fiction war film Battleship (2012).',
    birthyear: '1964'
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
  {
    name: 'romance',
    description: 'Romance films are love stories. They center around two protagonists exploring some of the elements of love like relationships, sacrifice, marriage, obsession, or destruction. '
  },
  {
    name: 'comedy',
    description: 'Comedy films are funny and entertaining. The films in this genre center around a comedic premise—usually putting someone in a challenging, amusing, or humorous situation they’re not prepared to handle. '
  },
  {
    name: 'crime',
    description: 'Crime film, in the broadest sense, is a film genre inspired by and analogous to the crime fiction literary genre. Films of this genre generally involve various aspects of crime and its detection. '
  },
  {
    name: 'thriller',
    description: 'Thriller film, also known as suspense film or suspense thriller, is a broad film genre that involves excitement and suspense in the audience. '
  },
  {
    name: 'biography',
    description: 'A biographical film, or biopic, is a film that dramatizes the life of a non-fictional or historically-based person or people. Such films show the life of a historical person and the central character\'s real name is used. '
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

// NOT WORKING :

// Adding new movie to list of favorites (NEW with PATCH) 
app.patch('/users/:username/favorites', (req, res) => {
  let favorite = req.body;
  if (!favorite.title) {
    const message = 'Missing Favorite Movie Title in Request Body!';
    res.status(400).send(message);
  } else {
    favorites.push(favorite);
    res.status(201).send(`The movie with the title ${favorite.title} has been added to your list of favorite movies.`);
  }
});

// Deleting movie from list of favorites
app.delete('/users/:username/favorites/:title', (req, res) => {
  let movieToDelete = favorites.find((title) => { return title === req.params.title });
  if (!movieToDelete) {
    const message = 'There is no movie with this title in the favorites list.';
    res.status(400).send(message);
  } else {
    res.status(201).send(`The movie with the title ${movieToDelete} has been deleted.`);
  }
});


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
app.listen(8080, () => {
  console.log('Your App is listening on Port 8080');
});