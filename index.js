const express = require('express')
const app = express()
const middleware = require('./middleware')
const ErrorHandlingMiddleware = require('./middleware/error-handling')
const mainControllers = require('./controllers')

middleware(app)
ErrorHandlingMiddleware(app)
app.use('', mainControllers)

let port = 3001
app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})