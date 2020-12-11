const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/Streaming', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
}).then(() => {
    console.log('Connection opened successfully in MongoDb');
}).catch(err => {
    console.log(err.message)
})

const db = mongoose.connection;

db.on('error', () => {
  console.log('Error occur from the database')
})

db.once('open', () => {
  console.log('Successfully accessed the database')
})

module.exports = mongoose;