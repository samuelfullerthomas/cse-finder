require('./main.css')

var getCseQueue = require('./lib/getCseQueue')
var parseSections = require('./lib/parseSections')
var mapBySection = require('./lib/mapBySection')
var buildUI = require('./lib/buildUI')
var age = require('./util/age')
var now = require('./util/now')
var config = require('./config')
var pollFor = require('./util/pollFor')
var storage = require('./util/storage')

var kickoff = async function (force) {
  var body = await pollFor(() => document.body)
  body.innerHTML = '<div class="loader"></div>'
  var items = await storage.get({
    auth: false,
    cache: false
  })

  if (!items.auth) {
    authError()
  } else {
    var cses
    var dataTime

    if (!force && items.cache && age(items.cache.time) < 5) {
      dataTime = items.cache.time
      cses = items.cache.data
    } else {
      cses = await Promise.all(config.cses.map(cse => getCseQueue(cse, items.auth)))
      dataTime = now()
      storage.set({
        cache: {
          time: now(),
          data: cses
        }
      })
    }

    cses.unshift({})
    cses = Object.assign.apply(Object, cses)
    cses = parseSections(cses)
    var sections = mapBySection(cses)

    var html = buildUI(sections, config.cses.map((c) => c.name))

    var refreshWrapper = document.createElement('div')
    refreshWrapper.innerHTML = 'Last updated ' + age(dataTime) + ' minutes ago. <a href="#"> Refresh? </a>'
    refreshWrapper.querySelector('a').addEventListener('click', function (e) {
      e.preventDefault()
      run(true)
    })

    body.innerHTML = ''
    body.appendChild(refreshWrapper)
    body.insertAdjacentHTML('beforeend', html)
  }
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

kickoff(false)
