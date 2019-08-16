module.exports = {
  sendReponse (req, res, status, message) {
    return res.status(status).json(message)
  }
}
