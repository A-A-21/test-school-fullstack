const express = require('express');
const PORT = process.env.PORT || 3001;
const mongoose = require('mongoose');
const authRouter = require('./routes/authRouter');
const lessonsRouter = require('./routes/lessonsRouter');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const logger = require('morgan');
require('dotenv').config();
const cors = require('cors');
const path = require("path");

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(process.env.PWD, 'public')));
app.use(cors(
  {
    origin: true,
    credentials: true,
    optionsSuccessStatus: 200,
  }
));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: new FileStore(),
  cookie: { secure: false },
  name: 'auth',
}));

app.use('/auth', authRouter);
app.use('/lessons', lessonsRouter);

const start = async () => {
  try {
    await mongoose.connect(`mongodb+srv://admin:qwe123@cluster0.igezy.mongodb.net/?retryWrites=true&w=majority`);
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};


start();
