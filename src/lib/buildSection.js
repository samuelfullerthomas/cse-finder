var capitalise = require('./capitalise')

function buildSection (section, title, cses) {
  var html = ''
  html += '<h3>' + capitalise(title) + '</h3>'
  html += '<div class="Row">'
  html += cses.map(function (cse) {
    if (!section[cse]) {
      return '<div class="List"></div>'
    }
    var tasks = section[cse].tasks
    var isFull = section[cse].status === 'full' || section[cse].status === 'ooo'
    var html = '<div class="List' + (isFull ? ' isFull' : '') + '">'
    html += tasks.map(function (t) { return '<div class="Task">' + t + '</div>' }).join('')
    html += '</div>'
    return html
  }).join('')
  html += '</div>'
  return html
}

module.exports = buildSection
