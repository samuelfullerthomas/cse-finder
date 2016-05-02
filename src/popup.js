require('./main.css')

import { cses } from './config'
import getQueues from './lib/getQueues'
import buildSections from './lib/buildSections'
import buildHeaders from './lib/buildHeaders'
import buildRefresh from './lib/buildRefresh'
import { age, now, pollFor, retrieve, capitalise } from './lib/util'

var kickoff = async function (force) {
  var body = await pollFor(() => document.body)
  body.innerHTML = '<div class="loader"></div>'
  var { auth } = await retrieve({ auth: false })

  if (!auth) {
    authError()
  } else {
    var { queues: sections, time } = await getQueues(auth, force)

    body.innerHTML = ''

    const $refresh = buildRefresh(time, () => kickoff(true))
    const $headers = buildHeaders(cses)
    const $sections = buildSections(sections, cses.map(c => c.name))

    body.appendChild($refresh)
    body.appendChild($headers)
    body.appendChild($sections)
  }
}

function authError () {
  var el = document.createElement('div')
  el.addEventListener('click', function () {
    window.chrome.runtime.openOptionsPage()
  })
  el.innerHTML = 'Click here to set your auth code!'
  el.style.width = '200px'
  el.style.textAlign = 'center'
  el.style.marginTop = '40px'
  document.body.innerHTML = ''
  document.body.appendChild(el)
}

kickoff(false)
