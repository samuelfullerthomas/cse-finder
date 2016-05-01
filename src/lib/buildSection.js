var capitalise = require('../util/capitalise')
var classnames = require('../util/classnames')

function buildSection (section, title, cses) {
  var html = ''
  html += '<h3>' + capitalise(title) + '</h3>'
  html += '<div class="Row">'
  html += cses.map(function (cse) {
    if (section[cse]) {
      return buildList(section[cse])
    }
    return buildList({
      status: 'free',
      tasks: []
    })
  }).join('')
  html += '</div>'
  return html
}

function buildList (list) {
  var className = classnames({
    List: true,
    isFull: list.status === 'full' || list.status === 'ooo'
  })

  var html = ''
  html += '<div class="' + className + '">'
  html += list.tasks.map(buildTask).join('')
  html += '</div>'

  return html
}

function buildTask (name) {
  return '<div class="Task">' + name + '</div>'
}

module.exports = buildSection
