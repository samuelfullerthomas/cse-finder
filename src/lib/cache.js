function getCache (cb) {
  window.chrome.storage.local.get({ cache: false }, function (items) {
    if (items.cache) {
      var age = (new Date()).getTime() - items.cache.time
      if (age < (5 * 60 * 1000)) {
        return cb(items.cache)
      }
      cb(false)
    }
  })
}

function setCache (data, cb) {
  window.chrome.storage.local.set({
    data: data,
    time: (new Date()).getTime()
  }, cb)
}

module.exports = {
  getCache: getCache,
  setCache: setCache
}
