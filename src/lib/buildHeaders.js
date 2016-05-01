var capitalise = require('./capitalise')

function buildHeaders (cses) {
  var html = ''
  html += '<div class="Row">'
  html += cses.map(function (cse) {
    return '<div class="List List-header">' + capitalise(cse) + '</div>'
  }).join('')
  html += '</div>'
  return html
}

module.exports = buildHeaders
