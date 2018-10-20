const env = process.env.NODE_ENV || 'development';

if (env === 'development') {
  process.env.PORT = 3001;
  process.env.MONGODB_URI = 'mongodb://tester:tester123@ds135993.mlab.com:35993/heroku_xbsm1zpm';
}
