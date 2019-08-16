const postal = require('postal')

module.exports = {
  subscribe (topic, channel, callback) {
    return postal.subscribe({
      channel, topic, callback
    })
  },
  publishe (topic, channel, data) {
    postal.publish({
      channel, topic, data
    })
  }
}
