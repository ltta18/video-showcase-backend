const {Video} = require('../models')
const {ValidationError} = require('../errors')

module.exports = class VideoService {
  async uploadVideo({title, author, url, length}) {
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
    return Video.find({}, "_id title author url view length")
  }

  async getVideo(_id) {
    return Video.findById(_id)
  }
}