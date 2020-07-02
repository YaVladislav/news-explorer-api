const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const helmet = require('helmet');

const limiter = require('./middlewares/rate-limit');

const errorHandler = require('./middlewares/error-handler');
const errorCelebrate = require('./middlewares/error-celebrate');

const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/newsdb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(limiter);
app.use(helmet());

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);

app.use(require('./routes'));

app.use(errorLogger);

app.use(errorCelebrate);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Приложение использует ${PORT} порт`);
});
