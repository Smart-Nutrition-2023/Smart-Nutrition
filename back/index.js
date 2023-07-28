const bodyParser = require('body-parser');
const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const sessionOption = require('./config/sessionOption');
const mysqlStore = require('express-mysql-session')(session);
const sessionStore = new mysqlStore(sessionOption);

const authRoutes = require('./routes/auth');
const mainRoutes = require('./routes/main');
const foodinfoRoutes = require('./routes/foodinfo');

const app = express();
const corsOptions = {
  //origin: 'http://localhost:3000',
  origin: true,
  credentials: true,
};
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(
  session({
    //key: 'loginData',
    secret: 'smartnutrition',
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
      //secure: true,
      maxAge: 86400000,
    },
    //name: 'session-cookie',
  }),
);

app.use('/profile', express.static('profile'));
app.use('/uploads', express.static('uploads'));

app.use('/auth', authRoutes);
app.use('/main', mainRoutes);
app.use('/foodinfo', foodinfoRoutes);

app.listen('5000', () => {
  console.log('Listening...');
});
