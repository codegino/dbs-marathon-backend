require('./config/config');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const _ = require('lodash');

require('./db/mongoose');
const {User} = require('./models/user');
const {Admin} = require('./models/admin');
const {authenticate} = require('./middleware/authenticate');

const app = express();

app.use(cors())
const port = process.env.PORT;

app.use(bodyParser.json());

app.post('/users', (req, res) => {
  const body = _.pick(req.body, ['email', 'mobile', 'fullname', 'gender', 'race']);
  const user = new User(body);

  user.save().then(() => res.status(200).send(user))
  .catch(e => {
    res.status(400).send({message: e.message})
  });
});

app.post('/login', async (req, res) => {
  const {username, password} = req.body

  const admin = await Admin.findOne({username, password})
  if (admin) {
    res.status(200).send({username: admin.username})
  } else {
    res.status(401).send()
  }
})

app.get('/users/report', authenticate, async (req, res) => {
  const users = await User.find({})

  if (users) {
    res.status(200).send({users})
  } else {
    res.status(400).send()
  }
});

app.get('/users', authenticate, (req, res) => {
  const {queryString} = req.query

  const findByEmail = User.findOne({email: queryString})
  const findByMobile = User.findOne({mobile: queryString})

  Promise.all([findByEmail, findByMobile])
  .then(results => {
    const user = results.find(o => o !== null)
    res.send({user});
  }, e => {
    res.status(400).send({message: e.message})
  })
});

app.listen(port, () => {
  console.log(`Started on port ${port}`);
});

module.exports = {app};
