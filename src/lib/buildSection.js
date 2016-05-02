import { capitalise, classnames } from './util'

export default function buildSection (section, title, cses, neutral) {
  var html = ''
  html += `<h3>${title}</h3>`
  html += '<div class="Row">'
  html += cses.map(cse => {
    return section[cse]
      ? buildList(section[cse], neutral)
      : buildList({
        full: false,
        tasks: []
      }, neutral)
  }).join('')
  html += '</div>'
  return html
}

function buildList (list, neutral) {
  var className = classnames({
    List: true,
    isFull: !neutral && list.full,
    isNeutral: neutral
  })

  var html = ''
  html += `<div class="${className}">`
  html += list.tasks.map(t => `<div class="Task">${t}</div>`).join('')
  html += '</div>'
  return html
}
