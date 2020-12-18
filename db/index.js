module.exports = require('mongoose').connect('mongodb://localhost/workout_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
