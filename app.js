const express = require('express');

const port = process.env.PORT || 3000;
const app = express();

app.post('/todos', (req, res) => {
  const todo = new Todo({
    text: req.body.text
  });
  
  todo.save().then(doc => {
    res.send(doc);
  }, err => {
    res.status(400).send(err);
  })
})

app.get('/', (req, res) => {
  res.send('Hello from Carlo Gino Pogi')
})

app.listen(port, () => {
  console.log(`Started on port ${port}`);
});

module.exports = {app};
