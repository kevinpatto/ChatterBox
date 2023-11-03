const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const helpers = require('./utils/helpers');

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const morgan = require('morgan');

const PORT = process.env.PORT || 3001;

// Set up Handlebars.js engine with custom helpers
const hbs = exphbs.create({ helpers });

const sess = {
  secret: 'Super secret secret',
  cookie: {
    maxAge: 300000,
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));

// Inform Express.js on which template engine to use
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(morgan('dev'))
app.use(routes);

io.sockets.on('connection', (socket) => {
  console.log('a user has joined');
  socket.on('join', (room) => {
    socket.join(room);
    socket.in(room).emit('notification', { notifcation: `${req.session.username} has joined` });
  });

  socket.on('message', (message) => {
    io.in(socket.rooms[1]).emit('message', { message, username: req.session.username });
  });

  socket.on('disconnect', () => {
    io.in(socket.rooms[1]).emit('notification', { notifcation: `${req.session.username} has left` });
  })
});

sequelize.sync({ force: false }).then(() => {
  http.listen(PORT, () => console.log(`Now listening http://localhost:${PORT}`));
});
