import { capitalise } from './util'

export default function buildHeaders (cses) {
  var html = ''
  html += '<div class="Row Row-header">'
  html += cses.map(cse => `<div class="List List-header">${capitalise(cse)}</div>`).join('')
  html += '</div>'
  return html
}
