module.exports = {
  ValidationError: class ValidationError {
    constructor(message) {
      this.message = message
    }
  },
  NotFoundError: class NotFoundError {
    constructor(message) {
      this.message = message
    }
  }
}