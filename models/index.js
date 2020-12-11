const mongoose = require('../database')
const Schema = mongoose.Schema

const videoSchema = new Schema({
  title: {
    type: String, required: true
  },
  author: {
    type: String, required: true
  },
  url: {
    type: String, required: true
  },
  view: {
    type: Number, default: 0,
  },
  deletedAt: {
    type: Date, required: false,
  },
}, {timestamps: true})

const collectionName = 'video'

const Video = mongoose.model(collectionName, videoSchema, collectionName)

module.exports = {
  Video,
}