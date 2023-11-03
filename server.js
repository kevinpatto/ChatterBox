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
  socket.on('join', (data) => {
    const { room, username } = data;
    const sockID = socket.id;
    console.log(`${username} of socket ID ${sockID} has joined`);
    socket.join(room);
    console.log(`${username} has been added to room number ${room}`);
    socket.in(room).emit('notification', { notification: `${username} has joined` });

    socket.on('message', (message, username) => {
      console.log(message + " " + username);
      io.in(room).emit('message', { sent: message, username });
    });

    socket.on('disconnect', (socket) => {
      console.log(`${username} of ${sockID} has disconnected from room ${room}`);
      io.in(room).emit('notification', { notification: `${username} has left` });
    });
  });
});

sequelize.sync({ force: false }).then(() => {
  http.listen(PORT, () => console.log(`Now listening http://localhost:${PORT}`));
});
