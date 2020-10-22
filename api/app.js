const express = require('express');
const logger = require('morgan');
const cors = require('cors')

const cpuLoadRouter = require('./routes/cpu-load');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const corsOptions = {
  origin: 'http://localhost:8000',
}

app.use(cors(corsOptions))

app.use(function(err, req, res, next){
  res.status(err.status || 500);
  res.send({
    message: err.message,
    error: err
  });
  return;
});

app.use('/cpu-load', cpuLoadRouter)

module.exports = app;
