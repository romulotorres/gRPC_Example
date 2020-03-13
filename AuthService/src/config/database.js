const mongoose = require('mongoose')
const settings = require('settings.json')

mongoose.connect(settings.CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
