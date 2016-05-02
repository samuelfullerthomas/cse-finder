import { createElement } from './util'

export default function buildHeaders (cses) {
  var $section = createElement('<div class="Section Section--header"></div>')
  var $innerWrapper = createElement('<div class="Section-innerWrapper"></div>')
  cses.forEach(cse => {
    var $header = createElement(`<div class="Cse"><span class="isClickable">${cse.name}</span></div>`)
    $header.addEventListener('click', function () {
      window.chrome.tabs.create({ url: `https://app.asana.com/0/${cse.id}` })
    })
    $innerWrapper.appendChild($header)
  })
  $section.appendChild($innerWrapper)
  return $section
}
