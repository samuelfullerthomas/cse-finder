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

Promise
  .all(cses.map(getCseQueue))
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
