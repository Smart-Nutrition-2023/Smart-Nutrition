const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const mainRoutes = require('./routes/main');
const foodinfoRoutes = require('./routes/foodinfo');

const app = express();
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
};
app.use(cors(corsOptions));
app.use(bodyParser.json());

app.use('/profile', express.static('profile'));
app.use('/uploads', express.static('uploads'));
app.use('/auth', authRoutes);
app.use('/main', mainRoutes);
app.use('/foodinfo', foodinfoRoutes);

app.listen('5000', () => {
  console.log('Listening...');
});
