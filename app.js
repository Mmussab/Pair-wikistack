const express = require('express');
const morgan = require('morgan');
const { db, Page, User } = require('./models');

const app = express();

app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res, next) => {
  console.log('hello world');
  res.send('its working');
});

db.authenticate().then(() => {
  console.log('connected to the database');
});

const init = async () => {
  await db.sync({ force: true });
  await Page.sync();
  await User.sync();

  const port = 1339;
  app.listen(port, () => {
    console.log('listening on port 1339');
  });
};

init();
