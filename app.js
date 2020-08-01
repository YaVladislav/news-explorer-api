const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const helmet = require('helmet');

const { PORT, DB_PATH } = require('./config');

const limiter = require('./middlewares/rate-limit');

const errorMongo = require('./middlewares/error-mongoose');
const errorCelebrate = require('./middlewares/error-celebrate');
const errorHandler = require('./middlewares/error-handler');

const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();

const corsOptions = {
  origin: ['http://localhost:8080', 'https://yavladislav.github.io/news-explorer-frontend'],
  methods: 'GET, HEAD, PUT, PATCH, POST, DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

mongoose.connect(DB_PATH, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(limiter);
app.use(helmet());

app.use('*', cors(corsOptions));

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);

app.use(require('./routes'));

app.use(errorLogger);

app.use(errorMongo);
app.use(errorCelebrate);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Приложение использует ${PORT} порт`);
});
