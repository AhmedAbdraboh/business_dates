module.exports = {
  generateSuccessResponse,
  generateFailedResponse
}

function generateSuccessResponse (data = {}) {
  return {
    ok: true,
    ...data
  }
}

function generateFailedResponse (data = {}) {
  return {

    ok: false,
    ...data
  }
}
