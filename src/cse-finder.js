require('./main.css')

var getCseQueue = require('./lib/getCseQueue')
var parseSections = require('./lib/parseSections')
var mapBySection = require('./lib/mapBySection')
var buildUI = require('./lib/buildUI')

var cses = [
  { name: 'Tommy', id: '41755044194088' },
  { name: 'Jimmy', id: '76629447954998' },
  { name: 'Stefi', id: '45131341129610' },
  { name: 'David', id: '19208422049726' }
]

window.chrome.storage.local.get({'auth': false}, function (items) {
  if (!items.auth) {
    var el = document.createElement('div')
    el.addEventListener('click', function () {
      window.chrome.runtime.openOptionsPage()
    })
    el.innerHTML = 'Click here to set your auth code!'
    var poll = function () {
      if (document.body) {
        document.body.innerHTML = ''
        document.body.appendChild(el)
      } else {
        setTimeout(poll, 50)
      }
    }
    poll()
  } else {
    Promise
      .all(cses.map(function (cse) {
        return getCseQueue(cse, items.auth)
      }))
      .then(function (cses) {
        cses.unshift({})
        return Object.assign.apply(Object, cses)
      })
      .then(parseSections)
      .then(mapBySection)
      .then(function (sections) {
        return buildUI(sections, cses.map(function (c) { return c.name }))
      })
      .then(function (html) {
        document.body.innerHTML = html
      })
  }
})
