const router = require('express').Router()
const asyncWrapper = require('../utilities/async-wrapper')

const VideoService = require('../services')
const videoService = new VideoService()

const {NotFoundError} = require('../errors')

const GridFSMiddleware = require('../middleware/gridfs-middleware')
const {getGridFSFiles} = require('../database/gridfs-service')
const {createGridFSReadStream} = require('../database/gridfs-service')

router.post('/video', [GridFSMiddleware()], asyncWrapper(async (req, res) => {
  const {originalname, mimetype, id, size} = req.file
  await videoService.uploadVideo({
    title: req.body.title,
    author: req.body.author,
    url: `http://localhost:3001/video/mp4/${id}`,
    length: req.body.length
  })
  res.send({originalname, mimetype, id, size, title: req.body.title})
}))

router.get('/video', asyncWrapper(async (req, res) => {
  const videos = await videoService.getAllVideos();
  res.send(videos)
}))

router.get('/video/:id', asyncWrapper(async (req, res) => {
  const video = await videoService.getVideo(req.params.id);
  res.send(video)
}))

router.get('/video/mp4/:id', asyncWrapper(async (req, res) => {
  const video = await getGridFSFiles(req.params.id)
  if (!video) {
    res.status(404).send({message: 'Video Not Found'})
  }
  res.setHeader('content-type', video.contentType)
  const readStream = createGridFSReadStream(req.params.id)
  readStream.pipe(res)
}))

router.get('/error', asyncWrapper(async () => {
  throw new NotFoundError('Content not found')
}))

module.exports = router;