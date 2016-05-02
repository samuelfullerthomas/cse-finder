import getCseQueue from './getCseQueue'
import parseSections from './parseSections'
import mapBySection from './mapBySection'
import { cses, cacheTime } from '../config'

import { age, now, retrieve, save } from './util'

export default async function getQueues (auth, force) {
  var { cache } = await retrieve({ cache: false })

  if (!force && cache && age(cache.time) < cacheTime) {
    return cache
  }

  var queues = await Promise.all(cses.map(cse => getCseQueue(cse, auth)))
  queues = Object.assign.apply(Object, [{}].concat(queues))
  queues = parseSections(queues)
  queues = mapBySection(queues)

  var data = { queues, time: now() }

  save({ cache: data })

  return data
}