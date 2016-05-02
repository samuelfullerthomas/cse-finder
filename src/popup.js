require('./popup.css')

import { cses } from './config'
import getQueues from './lib/getQueues'
import buildAuthError from './lib/buildAuthError'
import buildSections from './lib/buildSections'
import buildHeaders from './lib/buildHeaders'
import buildRefresh from './lib/buildRefresh'
import { age, now, pollFor, retrieve, capitalise } from './lib/util'

var kickoff = async function (force) {
  const body = await pollFor(() => document.body)
  body.innerHTML = '<div class="loader"></div>'
  const { auth } = await retrieve({ auth: false })

  if (!auth) {
    const $authError = buildAuthError()
    body.innerHTML = ''
    body.appendChild($authError)
  } else {
    const { queues, time } = await getQueues(auth, force)

    const $refresh = buildRefresh(time, () => kickoff(true))
    const $headers = buildHeaders(cses)
    const $sections = buildSections(queues, cses.map(c => c.name))

    body.innerHTML = ''
    body.appendChild($refresh)
    body.appendChild($headers)
    body.appendChild($sections)
  }
}

kickoff(false)
