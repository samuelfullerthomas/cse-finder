import { age, createElement } from './util'

export default function buildRefresh (time, action) {
  var html = ''
  html += '<div class="Refresh">'
  html += `Last updated ${age(time)} minutes ago. <a href="#"> Refresh? </a>`
  html += '</div>'
  var $refresh = createElement(html)
  $refresh.querySelector('a').addEventListener('click', function (e) {
    e.preventDefault()
    action()
  })

  return $refresh
}
