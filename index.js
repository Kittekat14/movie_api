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

mongoose.connect('mongodb://localhost:27017/ActorInspector', { useNewUrlParser: true, useUnifiedTopology: true });

/*
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
      birthyear: '1930'
    },
    imageUrl: 'https://www.imdb.com/title/tt0418689/mediaviewer/rm2742196480/?ref_=tt_ov_i',
    featured: false
  },
  {
    movieid: 2,
    title: 'Back to the Future',
    year: 1985,
    genre: {
      name: 'comedy',
      description: 'Comedy films are funny and entertaining. The films in this genre center around a comedic premise—usually putting someone in a challenging, amusing, or humorous situation they’re not prepared to handle.'
    },
    description: 'Marty McFly, a 17-year-old high school student, is accidentally sent thirty years into the past in a time-traveling DeLorean invented by his close friend, the eccentric scientist Doc Brown.',
    actors: ['Michael J. Fox', 'Christopher Lloyd', 'Lea Thompson'],
    director: {
      name: 'Robert Zemeckis',
      bio: 'Robert Lee Zemeckis is an American film director, film producer, and screenwriter who is frequently credited as an innovator in visual effects. He first came to public attention as the director of Romancing the Stone (1984) and the science-fiction comedy Back to the Future, as well as the live-action/animated comedy Who Framed Roger Rabbit (1988).',
      birthyear: '1951'
    },
    imageUrl: 'https://www.imdb.com/title/tt0088763/mediaviewer/rm554638848/?ref_=tt_ov_i',
    featured: true
  },
  {
    movieid: 3,
    title: 'Cast Away',
    year: 2000,
    genre: {
      name: 'adventure',
      description: 'Adventure films are a genre of film whose plots feature elements of travel. They typically involve protagonists who must leave their home or place of comfort and go to far away lands to fulfill a goal.'
    },
    description: 'A FedEx executive undergoes a physical and emotional transformation after crash landing on a deserted island.',
    actors: ['Tom Hanks', 'Helen Hunt', 'Paul Sanchez'],
    director: {
      name: 'Robert Zemeckis',
      bio: 'Robert Lee Zemeckis is an American film director, film producer, and screenwriter who is frequently credited as an innovator in visual effects. He first came to public attention as the director of Romancing the Stone (1984) and the science-fiction comedy Back to the Future, as well as the live-action/animated comedy Who Framed Roger Rabbit (1988).',
      birthyear: '1951'
    },
    imageUrl: 'https://www.imdb.com/title/tt0162222/mediaviewer/rm381427456/?ref_=tt_ov_i',
    featured: false
  },
  {
    movieid: 4,
    title: 'Milk',
    year: 2008,
    genre: {
      name: 'biography',
      description: 'A biographical film, or biopic, is a film that dramatizes the life of a non-fictional or historically-based person or people. Such films show the life of a historical person and the central character\'s real name is used.'
    },
    description: 'The story of Harvey Milk and his struggles as an American gay activist who fought for gay rights and became California\'s first openly gay elected official.',
    actors: ['Sean Penn', 'Emile Hirsch', 'Josh Brolin'],
    director: {
      name: 'Gus Van Sant',
      bio: 'Gus Green Van Sant Jr. is an American film director, screenwriter, painter, photographer, musician, and author who has earned acclaim as both an independent and mainstream filmmaker. His films typically deal with themes of marginalized subcultures, in particular homosexuality.',
      birthyear: '1952'
    },
    imageUrl: 'https://www.imdb.com/title/tt1013753/mediaviewer/rm1538495488/?ref_=tt_ov_i',
    featured: true
  },
  {
    movieid: 5,
    title: 'The Big Short',
    year: 2015,
    genre: {
      name: 'drama',
      description: 'The drama genre features stories with high stakes and a lot of conflicts. They\'re plot-driven and demand that every character and scene move the story forward. Dramas follow a clearly defined narrative plot structure, portraying real-life scenarios or extreme situations with emotionally-driven characters.'
    },
    description: 'In 2006-2007 a group of investors bet against the US mortgage market. In their research, they discover how flawed and corrupt the market is.',
    actors: ['Christian Bale', 'Steve Carell', 'Ryan Gosling'],
    director: {
      name: 'Adam McKay',
      bio: 'Adam McKay is an American film and television director, producer, screenwriter, and comedian. McKay began his career in the 1990s as a head writer for the NBC sketch comedy show Saturday Night Live for two seasons and is the co-founder of the Upright Citizens Brigade.',
      birthyear: '1968'
    },
    imageUrl: 'https://www.imdb.com/title/tt1596363/mediaviewer/rm3249474304/?ref_=tt_ov_i',
    featured: false
  },
  {
    movieid: 6,
    title: 'The Wolf of Wall Street',
    year: 2013,
    genre: {
      name: 'crime',
      description: 'Crime film, in the broadest sense, is a film genre inspired by and analogous to the crime fiction literary genre. Films of this genre generally involve various aspects of crime and its detection.'
    },
    description: 'Based on the true story of Jordan Belfort, from his rise to a wealthy stock-broker living the high life to his fall involving crime, corruption and the federal government.',
    actors: ['Leonardo DiCaprio', 'Jonah Hill', 'Margot Robbie'],
    director: {
      name: 'Martin Scorsese',
      bio: 'Martin Charles Scorsese is an American film director, producer, screenwriter, and actor. One of the major figures of the New Hollywood era, he is widely regarded as one of the greatest and most influential directors in film history.',
      birthyear: '1942'
    },
    imageUrl: 'https://www.imdb.com/title/tt0993846/mediaviewer/rm2842940160/?ref_=tt_ov_i',
    featured: false
  },
  {
    movieid: 7,
    title: 'Yesterday',
    year: 2019,
    genre: {
      name: 'comedy',
      description: 'Comedy films are funny and entertaining. The films in this genre center around a comedic premise—usually putting someone in a challenging, amusing, or humorous situation they’re not prepared to handle.'
    },
    description: 'A struggling musician realizes he\'s the only person on Earth who can remember The Beatles after waking up in an alternate timeline where they never existed.',
    actors: ['Himesh Patel', 'Lily James', 'Sophia Di Martino'],
    director: {
      name: 'Danny Boyle',
      bio: 'Daniel Francis Boyle is an English film, television, and stage director and producer. He is known for his work on films including Shallow Grave, Trainspotting, The Beach, 28 Days Later, Sunshine, Slumdog Millionaire, 127 Hours, Steve Jobs and Yesterday.',
      birthyear: '1956'
    },
    imageUrl: 'https://www.imdb.com/title/tt8079248/mediaviewer/rm1175416320/?ref_=tt_ov_i',
    featured: true
  },
  {
    movieid: 8,
    title: 'Parasite',
    year: 2019,
    genre: {
      name: 'thriller',
      description: 'Thriller film, also known as suspense film or suspense thriller, is a broad film genre that involves excitement and suspense in the audience.'
    },
    description: 'Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.',
    actors: ['Kang-ho Song', 'Sun-kyun Lee', 'Yeo-jeong Cho'],
    director: {
      name: 'Bong Joon Ho',
      bio: 'Bong Joon-ho is a South Korean film director, producer and screenwriter. He is a recipient of three Academy Awards. His films are characterised by emphasis on social themes, genre-mixing, black humor, and sudden tone shifts.',
      birthyear: '1969'
    },
    imageUrl: 'https://www.imdb.com/title/tt6751668/mediaviewer/rm3194916865/?ref_=tt_ov_i',
    featured: false
  },
  {
    movieid: 9,
    title: 'Patriots Day',
    year: 2016,
    genre: {
      name: 'crime',
      description: 'Crime film, in the broadest sense, is a film genre inspired by and analogous to the crime fiction literary genre. Films of this genre generally involve various aspects of crime and its detection.'
    },
    description: 'The story of the 2013 Boston Marathon bombing and the aftermath, which includes the city-wide manhunt to find the terrorists responsible.',
    actors: ['Mark Wahlberg', 'Michelle Monaghan', 'J.K. Simmons'],
    director: {
      name: 'Peter Berg',
      bio: 'Peter Berg is an American actor, director, writer, and producer. His directorial film works include the black comedy Very Bad Things (1998), the action comedy The Rundown (2003), the sports drama Friday Night Lights (2004), the action thriller The Kingdom (2007), the superhero comedy-drama Hancock (2008), the military science fiction war film Battleship (2012).',
      birthyear: '1964',
    },
    imageUrl: 'https://www.imdb.com/title/tt4572514/mediaviewer/rm1786188800/?ref_=tt_ov_i',
    featured: false
  },
  {
    movieid: 10,
    title: 'Deepwater Horizon',
    year: 2016,
    genre: {
      name: 'action',
      description: 'Action film is a film genre in which the protagonist or protagonists are thrust into a series of events that typically include violence, extended fighting, physical feats, rescues and frantic chases.'
    },
    description: 'A dramatization of the disaster in April 2010, when the offshore drilling rig called the Deepwater Horizon exploded, resulting in the worst oil spill in American history.',
    actors: ['Mark Wahlberg', 'Kurt Russell', 'Douglas M. Griffin'],
    director: {
      name: 'Peter Berg',
      bio: 'Peter Berg is an American actor, director, writer, and producer. His directorial film works include the black comedy Very Bad Things (1998), the action comedy The Rundown (2003), the sports drama Friday Night Lights (2004), the action thriller The Kingdom (2007), the superhero comedy-drama Hancock (2008), the military science fiction war film Battleship (2012).',
      birthyear: '1964'
    },
    imageUrl: 'https://www.imdb.com/title/tt1860357/mediaviewer/rm3273657088/?ref_=tt_ov_i',
    featured: false
  },
  {
    movieid: 11,
    title: 'Shutter Island',
    year: 2010,
    genre: {
      name: 'thriller',
      description: 'Thriller film, also known as suspense film or suspense thriller, is a broad film genre that involves excitement and suspense in the audience.'
    },
    description: 'In 1954, a U.S. Marshal investigates the disappearance of a murderer who escaped from a hospital for the criminally insane.',
    actors: ['Leonardo Di Caprio', 'Emily Mortimer', 'Mark Ruffalo'],
    director: {
      name: 'Martin Scorsese',
      bio: 'Martin Charles Scorsese is an American film director, producer, screenwriter, and actor. One of the major figures of the New Hollywood era, he is widely regarded as one of the greatest and most influential directors in film history.',
      birthyear: '1942'
    },
    imageUrl: 'https://www.imdb.com/title/tt1130884/mediaviewer/rm1814907136/?ref_=tt_ov_i',
    featured: false
  },
  {
    movieid: 12,
    title: 'Catch Me If You Can',
    year: 2002,
    genre: {
      name: 'biography',
      description: 'A biographical film, or biopic, is a film that dramatizes the life of a non-fictional or historically-based person or people. Such films show the life of a historical person and the central character\'s real name is used.'
    },
    description: 'Barely 21 yet, Frank is a skilled forger who has passed as a doctor, lawyer and pilot. FBI agent Carl becomes obsessed with tracking down the con man, who only revels in the pursuit.',
    actors: ['Leonardo Di Caprio', 'Tom Hanks', 'Amy Adams'],
    director: {
      name: 'Steven Spielberg',
      bio: 'Steven Allan Spielberg is an American film director, producer, and screenwriter. He began his career in the New Hollywood era, and is one of the most commercially successful directors in history.',
      birthyear: '1946'
    },
    imageUrl: 'https://www.imdb.com/title/tt0264464/mediaviewer/rm3911489536/?ref_=tt_ov_i',
    featured: false
  },
  {
    movieid: 13,
    title: 'Jexi',
    year: 2019,
    genre: {
      name: 'comedy',
      description: 'Comedy films are funny and entertaining. The films in this genre center around a comedic premise—usually putting someone in a challenging, amusing, or humorous situation they’re not prepared to handle.'
    },
    description: 'Phil makes top 10 pop lists at work. His only "friend" is cellphone Siri. His new phone includes AI helper Jexi, who improves/controls his social life.',
    actors: ['Adam Devine', 'Alexandra Shipp', 'Rose Byrne'],
    director: {
      name: 'Jon Lucas',
      bio: 'Jonathan Lucas is an American film director and screenwriter. He is best known for his collaborative work with Scott Moore, which includes The Hangover, 21 & Over and Bad Moms.',
      birthyear: '1976'
    },
    imageUrl: 'https://www.imdb.com/title/tt9354944/mediaviewer/rm219780609/?ref_=tt_ov_i',
    featured: false
  },
  {
    movieid: 14,
    title: 'Forrest Gump',
    year: 1994,
    genre: {
      name: 'romance',
      description: 'Romance films are love stories. They center around two protagonists exploring some of the elements of love like relationships, sacrifice, marriage, obsession, or destruction.'
    },
    description: 'The presidencies of Kennedy and Johnson, the Vietnam War, the Watergate scandal and other historical events unfold from the perspective of an Alabama man with an IQ of 75, whose only desire is to be reunited with his childhood sweetheart.',
    actors: ['Tom Hanks', 'Robin Wright', 'Gary Sinise'],
    director: {
      name: 'Robert Zemeckis',
      bio: 'Robert Lee Zemeckis is an American film director, film producer, and screenwriter who is frequently credited as an innovator in visual effects. He first came to public attention as the director of Romancing the Stone (1984) and the science-fiction comedy Back to the Future, as well as the live-action/animated comedy Who Framed Roger Rabbit (1988).',
      birthyear: '1951'
    },
    imageUrl: 'https://www.imdb.com/title/tt0109830/mediaviewer/rm1954748672/?ref_=tt_ov_i',
    featured: true
  },
  {
    movieid: 15,
    title: 'Knives Out',
    year: 2019,
    genre: {
      name: 'crime',
      description: 'Crime film, in the broadest sense, is a film genre inspired by and analogous to the crime fiction literary genre. Films of this genre generally involve various aspects of crime and its detection.'
    },
    description: 'A detective investigates the death of a patriarch of an eccentric, combative family.',
    actors: ['Daniel Craig', 'Chris Evans', 'Jamie Lee Curtis'],
    director: {
      name: 'Rian Johnson',
      bio: 'Rian Craig Johnson is an American film director, producer, and screenwriter. He made his directorial debut with the neo-noir mystery film Brick, which received positive reviews and grossed nearly $4 million on a $450,000 budget.',
      birthyear: '1973'
    },
    imageUrl: 'https://www.imdb.com/title/tt8946378/mediaviewer/rm2569376769/?ref_=tt_ov_i',
    featured: true
  },
  {
    movieid: 16,
    title: 'Slumdog Millionaire',
    year: 2008,
    genre: {
      name: 'drama',
      description: 'The drama genre features stories with high stakes and a lot of conflicts. They\'re plot-driven and demand that every character and scene move the story forward. Dramas follow a clearly defined narrative plot structure, portraying real-life scenarios or extreme situations with emotionally-driven characters.'
    },
    description: 'A Mumbai teenager reflects on his life after being accused of cheating on the Indian version of "Who Wants to be a Millionaire?".',
    actors: ['Dev Patel', 'Freida Pinto', 'Saurabh Shukla'],
    director: {
      name: 'Danny Boyle',
      bio: 'Daniel Francis Boyle is an English film, television, and stage director and producer. He is known for his work on films including Shallow Grave, Trainspotting, The Beach, 28 Days Later, Sunshine, Slumdog Millionaire, 127 Hours, Steve Jobs and Yesterday.',
      birthyear: '1956'
    },
    imageUrl: 'https://www.imdb.com/title/tt1010048/mediaviewer/rm2952200704/?ref_=tt_ov_i',
    featured: true
  },
  {
    movieid: 17,
    title: 'The Holiday',
    year: 2006,
    genre: {
      name: 'romance',
      description: 'Romance films are love stories. They center around two protagonists exploring some of the elements of love like relationships, sacrifice, marriage, obsession, or destruction.'
    },
    description: 'Two women troubled with guy-problems swap homes in each other\'s countries, where they each meet a local guy and fall in love.',
    actors: ['Kate Winslet', 'Cameron Diaz', 'Jude Law'],
    director: {
      name: 'Nancy Meyers',
      bio: 'Nancy Jane Meyers is an American filmmaker. She wrote, produced, and directed numerous critically and commercially successful romantic comedy films, including The Parent Trap, What Women Want, Something\'s Gotta Give, The Holiday, It\'s Complicated, and The Intern.',
      birthyear: '1949'
    },
    imageUrl: 'https://www.imdb.com/title/tt0457939/mediaviewer/rm3712915712/?ref_=tt_ov_i',
    featured: false
  },
  {
    movieid: 18,
    title: 'Saving Private Ryan',
    year: 1998,
    genre: {
      name: 'drama',
      description: 'The drama genre features stories with high stakes and a lot of conflicts. They’re plot-driven and demand that every character and scene move the story forward.'   
    },
    description: 'Following the Normandy Landings, a group of U.S. soldiers go behind enemy lines to retrieve a paratrooper whose brothers have been killed in action.',
    actors: ['Tom Hanks', 'Tom Sizemore', 'Matt Damon'],
    director: {
      name: 'Steven Spielberg',
      bio: 'Steven Allan Spielberg is an American film director, producer, and screenwriter. He began his career in the New Hollywood era, and is one of the most commercially successful directors in history.',
      birthyear: '1946'
    },
    imageUrl: 'https://www.imdb.com/title/tt0120815/mediaviewer/rm1924732160/?ref_=tt_ov_i',
    featured: false
  },
  {
    movieid: 19,
    title: 'The Kingdom',
    year: 2007,
    genre: {
      name: 'action',
      description: 'Action film is a film genre in which the protagonist or protagonists are thrust into a series of events that typically include violence, extended fighting, physical feats, rescues and frantic chases.'
    },
    description: 'A team of U.S. government agents are sent to investigate the bombing of an American facility in the Middle East.',
    actors: ['Jamie Foxx', 'Chris Cooper', 'Jennifer Garner'],
    director: {
      name: 'Peter Berg',
      bio: 'Peter Berg is an American actor, director, writer, and producer. His directorial film works include the black comedy Very Bad Things (1998), the action comedy The Rundown (2003), the sports drama Friday Night Lights (2004), the action thriller The Kingdom (2007), the superhero comedy-drama Hancock (2008), the military science fiction war film Battleship (2012).',
      birthyear: '1964'
    },
    imageUrl: 'https://www.imdb.com/title/tt0431197/mediaviewer/rm4167013120/?ref_=tt_ov_i',
    featured: true
  },
  {
    movieid: 20,
    title: 'Vice',
    year: 2018,
    genre: {
      name: 'biography',
      description: 'Action film is a film genre in which the protagonist or protagonists are thrust into a series of events that typically include violence, extended fighting, physical feats, rescues and frantic chases.'
    },
    description: 'The story of Dick Cheney, an unassuming bureaucratic Washington insider, who quietly wielded immense power as Vice President to George W. Bush, reshaping the country and the globe in ways that we still feel today.',
    actors: ['Christian Bale', 'Amy Adams', 'Steve Carell'],
    director: {
      name: 'Adam McKay',
      bio: 'Adam McKay is an American film and television director, producer, screenwriter, and comedian. McKay began his career in the 1990s as a head writer for the NBC sketch comedy show Saturday Night Live for two seasons and is the co-founder of the Upright Citizens Brigade.',
      birthyear: '1968'
    },
    imageUrl: 'https://www.imdb.com/title/tt6266538/mediaviewer/rm4187126784/?ref_=tt_ov_i',
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
    favorites: [3,7,12,14]
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
  },
  {
    _id: 7,
    username: 'Schnaeggal',
    password: 'dirndl18',
    email: 'carina.schnecke@web.de',
    birthdate: new Date('1991-08-07'),
    favorites: [2, 5, 6, 8, 17]
  },
  {
    _id: 8,
    username: 'Chrissal1994',
    password: 'schwesterherz',
    email: 'chrissal1210@yahoo.de',
    birthdate: new Date('1994-10-12'),
    favorites: [13, 14, 15, 16, 17]
  }
];*/

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
    bio: 'Martin Charles Scorsese is an American film director, producer, screenwriter, and actor. One of the major figures of the New Hollywood era, he is widely regarded as one of the greatest and most influential directors in film history.',
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
    name: 'Bong Joon Ho',
    bio: 'Bong Joon-ho is a South Korean film director, producer and screenwriter. The recipient of three Academy Awards, His films are characterised by emphasis on social themes, genre-mixing, black humor, and sudden tone shifts.',
    birthyear: '1969'
  },
  {
    name: 'Peter Berg',
    bio: 'Peter Berg is an American actor, director, writer, and producer. His directorial film works include the black comedy Very Bad Things (1998), the action comedy The Rundown (2003), the sports drama Friday Night Lights (2004), the action thriller The Kingdom (2007), the superhero comedy-drama Hancock (2008), the military science fiction war film Battleship (2012).',
    birthyear: '1964'
  },
  {
    name: 'Rian Johnson',
    bio: 'Rian Craig Johnson is an American film director, producer, and screenwriter. He made his directorial debut with the neo-noir mystery film Brick, which received positive reviews and grossed nearly $4 million on a $450,000 budget.',
    birthyear: '1973'
  },
  {
    name: 'Nancy Meyers',
    bio: 'Nancy Jane Meyers is an American filmmaker. She wrote, produced, and directed numerous critically and commercially successful romantic comedy films, including The Parent Trap, What Women Want, Something\'s Gotta Give, The Holiday, It\'s Complicated, and The Intern.',
    birthyear: '1949'
  },
  {
    name: 'Jon Lucas',
    bio: 'Jonathan Lucas is an American film director and screenwriter. He is best known for his collaborative work with Scott Moore, which includes The Hangover, 21 & Over and Bad Moms.',
    birthyear: '1976',
    movies: ['Bad Moms', 'Bad Moms 2', '21 & Over', 'The Hangover', 'The Hangover 2', 'The Hangover 3']
  }
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
  }).catch((err) => {
    console.error(err);
    res.status(500).send('Error: ' + err);
  });
})

//GET directors by name //NOT in MongoDB, but "in-memory"-data
app.get('/directors/:name', (req,res) => {
  const director = directors.find(d => d.name === req.params.name);
  if(!director) {
    res.status(404).send('The director with this name was not found.');
  } else {
    res.status(200).json(director);
  }
})

//GET all directors //NOT in MongoDB, but "in-memory"-data
app.get('/directors/', (req,res) => {
  const director = directors.find(d => d.name === req.params.name);
  if(!director) {
    res.status(404).send('The director with this name was not found.');
  } else {
    res.status(200).json(director);
  }
})
//GET genres by name //NOT in MongoDB, but "in-memory"-data
app.get('/genres/:name', (req,res) => {
  const genre = genres.find(g => g.name === req.params.name);
  if(!genre) {
    res.status(404).send('The genre with this name was not found.');
  } else {
    res.status(200).json(genre);
  }
})

// GET all users //OK
app.get('/users', (req, res) => {
  Users.find()
    .then((users) => {
      res.status(201).json(users);
    }).catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

// GET user by username // OK
app.get('/users/:username', (req, res) => {
  Users.findOne({ username: req.params.username })
    .then((user) => {
      res.status(201).json(user);
    }).catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

// POST and PUT Methods 
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

// Updating username of a certain user
app.put('/users/:username', (req, res) => {
  Users.findOneAndUpdate({ username: req.params.username }, { $set:
    {
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
      birthdate: req.body.birthdate
    }
  },
  { new: true }, // This line makes sure that the updated document is returned
  (err, updatedUser) => {
    if(err) {
      console.error(err);
      res.status(500).send('Error: ' + err);
    } else {
      res.json(updatedUser);
    }
  });
})

// Adding movie to favorites by MovieId(?) in params //NOT working
app.post('/users/:username/movies/:MovieId', (req, res) => {
  Users.findOneAndUpdate({ username: req.params.username }, {
    $push: { favorites: req.params.MovieID }
  },
  { new: true },
  (err, updatedUser) => {
   if (err) {
     console.error(err);
     res.status(500).send('Error: ' + err);
   } else {
     res.json(updatedUser);
   }
  }
 )
});

// DELETE Requests
// Remove movie from favorites by MovieId in params // NOT working
app.delete('/users/:username/movies/:MovieId', (req, res) => {
  Users.findOneAndUpdate({ username: req.params.username }, 
   {
    $pull: {favorites: req.params.MovieId} 
   },      
    {new: true}
    .then((updatedUser) => {
    res.status(201).json(updatedUser)})
    .catch((error) => {
    console.error(error);
    res.status(500).send('Error: ' + error);
    })
  )
})

// Deleting user by username
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