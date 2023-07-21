const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/auth');

const app = express();
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
};
app.use(cors(corsOptions));
app.use(bodyParser.json());

app.use('/auth', authRoutes);

app.listen('5000', () => {
  console.log('Listening...');
});
