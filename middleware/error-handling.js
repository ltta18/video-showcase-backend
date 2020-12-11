const {ValidationError, NotFoundError} = require('../errors')

const errorLogger = (err, req, res, next) => {
  if (err.message) {
    console.log(err.message)
  }
  if (err.stack) {
    console.log(err.message)
  }
  next(err)
}

const validationErrorHandler = (err, req, res, next) => {
  if (err instanceof ValidationError) {
    return res.status(400).send({message: err.message})
  }
  next(err)
}

const notFoundErrorHandler = (err, req, res, next) => {
  if (err instanceof NotFoundError) {
    return res.status(404).send({message: err.message})
  }
  next(err)
}

const generalErrorHandler = (err, req, res, next) => {
  res.status(500).send({message: err.message})
  next()
}

const ErrorHandlingMiddleware = app => {
  app.use([
    errorLogger,
    validationErrorHandler,
    notFoundErrorHandler,
    generalErrorHandler
  ])
}

module.exports = ErrorHandlingMiddleware