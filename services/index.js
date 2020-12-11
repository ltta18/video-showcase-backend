const {Video} = require('../models')
const {ValidationError} = require('../errors')

module.exports = class VideoService {
  async uploadVideo({title, author, url}) {
    try {
      const newVideo = new Video({
        title,
        author,
        url,
        view: 0,
      })
      await newVideo.save()
    } catch (e) {
      if (e.name === 'MongoError' && e.code === 11000) 
        throw new ValidationError('Duplicate id')
      throw new Error('Internal Server Error')
    }
  }

  async getAllVideos() {
    return Video.find({}, "_id title author url view createAt")
  }

  async getVideosByTitle(title) {
    return Video.find({title: new RegExp(title.toLowerCase()+'*')}, "_id title author url view createAt")
  }

  async getVideo(_id) {
    return Video.findById(_id)
  }
}