require('./main.css')

var getCseQueue = require('./lib/getCseQueue')
var parseSections = require('./lib/parseSections')
var mapBySection = require('./lib/mapBySection')
var buildUI = require('./lib/buildUI')
var age = require('./util/age')
var now = require('./util/now')
var config = require('./config')

var dataTime

var run = function (force) {
  document.body.innerHTML = '<div class="loader"></div>'
  window.chrome.storage.local.get({
    auth: false,
    cache: false
  }, function (items) {
    if (!items.auth) {
      authError()
    } else {
      (function () {
        if (!force && items.cache && age(items.cache.time) < 5) {
          dataTime = items.cache.time
          return new Promise(function (r) {
            console.log('using cache')
            r(items.cache.data)
          })
        }
        return Promise
          .all(config.cses.map(function (cse) {
            return getCseQueue(cse, items.auth)
          }))
          .then(function (data) {
            console.log('fresh data')
            dataTime = now()
            window.chrome.storage.local.set({
              cache: {
                time: now(),
                data: data
              }
            })
            return data
          })
      })()
        .then(function (cses) {
          cses.unshift({})
          return Object.assign.apply(Object, cses)
        })
        .then(parseSections)
        .then(mapBySection)
        .then(function (sections) {
          return buildUI(sections, config.cses.map(function (c) { return c.name }))
        })
        .then(function (html) {
          var refreshWrapper = document.createElement('div')
          refreshWrapper.innerHTML = 'Last updated ' + age(dataTime) + ' minutes ago. <a href="#"> Refresh? </a>'
          refreshWrapper.querySelector('a').addEventListener('click', function (e) {
            e.preventDefault()
            run(true)
          })

          document.body.innerHTML = ''
          document.body.appendChild(refreshWrapper)
          document.body.insertAdjacentHTML('beforeend', html)
        })
    }
  })
}

function authError () {
  var el = document.createElement('div')
  el.addEventListener('click', function () {
    window.chrome.runtime.openOptionsPage()
  })
  el.innerHTML = 'Click here to set your auth code!'
  el.style.width = '200px'
  el.style.textAlign = 'center'
  el.style.marginTop = '40px'
  document.body.innerHTML = ''
  document.body.appendChild(el)
}

var poll = function poll () {
  if (document.body) {
    run(false)
  } else {
    window.setTimeout(poll, 100)
  }
}

poll()
