const commonMiddleware = require('./common')

const middleware = app => {
  commonMiddleware(app)
}

module.exports = middleware;