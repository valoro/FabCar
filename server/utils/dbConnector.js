require('dotenv').config();

module.exports = {
  uri: `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@ds215759.mlab.com:15759/${process.env.DB_NAME}`,
  secret: `${process.env.DB_SECRET}`
};
