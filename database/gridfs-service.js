const mongoose = require('mongoose');

const GridFsStorage = require('multer-gridfs-storage')
const Grid = require('gridfs-stream')
Grid.mongo = mongoose.mongo

const conn = mongoose.createConnection('mongodb://localhost:27017/Streaming', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
})

conn.on('error', () => {
  console.log('Error occurs from the database')
})

let gfs, gridFSBucket;

conn.once('open', () => {
  gridFSBucket = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: 'file_uploads'
  })
  gfs = Grid(conn.db)
  gfs.collection('file_uploads')
  console.log('Connection successfully opened in GridFS Service')
})

const getGridFSFiles = id => {
  return new Promise((resolve, reject) => {
    gfs.files.findOne({_id: mongoose.Types.ObjectId(id)}, (err, files) => {
      if (err) reject(err)
      if (!files || files.length === 0) {
        resolve(null)
      } else {
        resolve(files)
      }
    })
  })
}

const createGridFSReadStream = id => {
  return gridFSBucket.openDownloadStream(mongoose.Types.ObjectId(id))
}

const storage = new GridFsStorage({
  url: 'mongodb://localhost:27017/Streaming',
  cache: true,
  options: {useUnifiedTopology: true},
  file: (req, file) => {
    return new Promise(resolve => {
      const fileInfo = {
        filename: file.originalname,
        bucketName: 'file_uploads'
      }
      resolve(fileInfo)
    })
  }
})

storage.on('connection', () => {
  console.log('Successfully accessed GridFS Database')
})

storage.on('connectionFailed', err => {
  console.log(err.message)
})

module.exports = mongoose;
module.exports.storage = storage;
module.exports.getGridFSFiles = getGridFSFiles;
module.exports.createGridFSReadStream = createGridFSReadStream;