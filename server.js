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
const morgan = require('morgan')

io.on('connection', (socket) => {
  // Use the chat handling logic from chat.js
  // handleUserInitiatedChat(socket);
  console.log('connected')
  socket.on('send-message', (message) => {
    // save message into database (table: messages)
    // message table:
    // (id, userWhoSent, message, chatroomId, time(included by table))
    // search table by chatroomId
  })
});


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

sequelize.sync({ force: false }).then(() => {
  http.listen(PORT, () => console.log(`Now listening http://localhost:${PORT}`));
});
