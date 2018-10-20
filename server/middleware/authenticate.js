const authenticate = (req, res, next) => {
  console.log('Fake authentication!')
  next();
}

module.exports = {authenticate};