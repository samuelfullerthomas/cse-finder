import { age, createElement } from './util'

export default function buildRefresh (time, action) {
  let html = ''
  html += '<div class="Refresh">'
  html += `Last updated ${age(time)} minutes ago. <a href="#"> Refresh? </a>`
  html += '</div>'
  const $refresh = createElement(html)
  $refresh.querySelector('a').addEventListener('click', e => {
    e.preventDefault()
    action()
  })

  return $refresh
}
