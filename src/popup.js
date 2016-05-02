require('./main.css')

import { cses } from './config'
import getQueues from './lib/getQueues'
import buildUI from './lib/buildUI'
import { age, now, pollFor, retrieve } from './lib/util'

var kickoff = async function (force) {
  var body = await pollFor(() => document.body)
  body.innerHTML = '<div class="loader"></div>'
  var { auth } = await retrieve({ auth: false })

  if (!auth) {
    authError()
  } else {
    var { queues: sections, time } = await getQueues(auth, force)

    var html = buildUI(sections, cses.map((c) => c.name))

    var refreshWrapper = document.createElement('div')
    refreshWrapper.innerHTML = 'Last updated ' + age(time) + ' minutes ago. <a href="#"> Refresh? </a>'
    refreshWrapper.querySelector('a').addEventListener('click', function (e) {
      e.preventDefault()
      kickoff(true)
    })

    body.innerHTML = ''
    body.appendChild(refreshWrapper)
    body.insertAdjacentHTML('beforeend', html)
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
