import {
  capitalise,
  ordinalise,
  objectSome,
  createElement,
  classnames
} from './util'
import { minDays } from '../config'

export default function buildSections (sections, cses) {
  var currentDate = new Date()
  currentDate.setUTCDate(currentDate.getUTCDate() - 1)

  sections = enrichSections(sections, cses)

  var $wrapper = createElement('<div class="Wrapper"></div>')

  sections.forEach(section => {
    var $section = buildSection(section, cses)
    $wrapper.appendChild($section)
  })

  return $wrapper
}

function buildSection ({ title, cses }) {
  var html = ''
  html += '<div class="Section">'
  html += `<h3 class="Section-title">${title}</h3>`
  html += '<div class="Section-innerWrapper"></div>'
  html += '</div>'
  var $section = createElement(html)

  var $innerWrapper = $section.querySelector('.Section-innerWrapper')

  cses.forEach(cse => {
    const $cse = buildCse(cse)
    $innerWrapper.appendChild($cse)
  })

  return $section
}

function buildCse (cse) {
  var className = classnames({
    Cse: true,
    isFull: cse.full,
    isFree: cse.free
  })

  var $cse = createElement(`<div class="${className}"></div>`)
  cse.tasks.forEach(task => {
    const $task = createElement(`<div class="Task isClickable">${task.name}</div>`)
    $task.addEventListener('click', e => {
      window.chrome.tabs.create({ url: task.url })
    })
    $cse.appendChild($task)
  })
  return $cse
}

function enrichSections (sections, cses) {
  var output = []
  var foundFree = false

  var currentDate = new Date()
  currentDate.setUTCDate(currentDate.getUTCDate() - 1)

  // Get Date sections
  while (output.length < minDays || !foundFree) {
    currentDate = getNextDay(currentDate)
    const targetSection = sections[dateToKey(currentDate)]
    const newSection = {
      title: capitalise(dateToTitle(currentDate)),
      cses: cses.map(cse => {
        return targetSection[cse] || {
          free: true,
          full: false,
          tasks: []
        }
      })
    }
    output.push(newSection)
    foundFree = objectSome(newSection.cses, k => k.free) ? true : foundFree
  }

  if (sections.qa) {
    const qaSection = {
      title: 'QA',
      cses: cses.map(cse => {
        return sections.qa[cse] || {
          free: false,
          full: false,
          tasks: []
        }
      })
    }
    output.push(qaSection)
  }

  if (sections.xb) {
    const xbSection = {
      title: 'XB',
      cses: cses.map(cse => {
        return sections.xb[cse] || {
          free: false,
          full: false,
          tasks: []
        }
      })
    }
    output.push(xbSection)
  }

  return output
}

function getNextDay (base) {
  var next = new Date(base.getTime())
  do {
    next.setUTCDate(next.getUTCDate() + 1)
  } while (!isWorkingDay(next))
  return next
}

function isWorkingDay (date) {
  var day = date.getUTCDay()
  return day !== 0 && day !== 6 && !isBankHoliday(date)
}

function isBankHoliday (date) {
  var bankHolidays = [
    [5 - 1, 2],
    [5 - 1, 30],
    [8 - 1, 29],
    [12 - 1, 26],
    [12 - 1, 27]
  ]
  return bankHolidays.some(b => {
    return date.getUTCDate() === b[1] && date.getUTCMonth() === b[0]
  })
}

function dateToKey (date) {
  var days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
  return days[date.getUTCDay()] + date.getUTCDate()
}

function dateToTitle (date) {
  var days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
  return days[date.getUTCDay()] + ' ' + ordinalise(date.getUTCDate())
}
