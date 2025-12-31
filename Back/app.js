const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const { expressjwt: expressJwt } = require('express-jwt');
const cors = require('cors');
const corsOptions = {
    exposedHeaders: 'generatedToken'
};

/* API routes */
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const playlistsRouter = require('./routes/playlists');
const songsRouter = require('./routes/songs');

const app = express();

app.use(logger('dev'));
app.use(cors(corsOptions));
app.use('/public/images', express.static(path.join(__dirname, 'public/images')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(expressJwt({
    secret: 'musicHub-app-shared-secret',
    algorithms: ['HS256']
}).unless(
    {
        path: ['/auth/google']
    }
));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
/* Mongoose connection */
mongoose.connect('mongodb://localhost:27017/MusicHub');
const db = mongoose.connection;

app.use('/auth', indexRouter);
app.use('/users', usersRouter);
app.use('/playlists', playlistsRouter);
app.use('/songs', songsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500).send({error: err});
});

module.exports = app;
