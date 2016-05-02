import { age, now, ordinalise, isWorkingDay } from './util/dateUtil'
export { age, now, ordinalise, isWorkingDay }

import { save, retrieve } from './util/storageUtil'
export { save, retrieve }

import { createElement, pollFor, classnames } from './util/domUtils'
export { createElement, pollFor, classnames }

export function capitalise (str, allWords) {
  if (allWords) {
    return str
      .split(' ')
      .map(w => capitalise(w, false))
      .join(' ')
  }
  return str[0].toUpperCase() + str.slice(1).toLowerCase()
}

export function objectSome (obj, fn) {
  return Object.keys(obj).some(key => fn(obj[key]))
}

export function openTab (url) {
  window.chrome.tabs.create({ url })
}
