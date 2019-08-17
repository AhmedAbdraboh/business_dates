module.exports = function (dateTime) {
  if (!dateTime || dateTime.invalid) return false
  return true
}
