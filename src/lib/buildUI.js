import buildSection from './buildSection'
import buildHeaders from './buildHeaders'
import { capitalise, ordinalise, objectSome } from './util'
import { minDays } from '../config'

function buildUI (sections, cses) {
  var currentDate = new Date()
  currentDate.setUTCDate(currentDate.getUTCDate() - 1)
  var foundFree = false

  var htmlSections = []

  while (htmlSections.length < minDays || !foundFree) {
    currentDate = getNextDay(currentDate)
    let section = sections[dateToKey(currentDate)] || {}
    let title = dateToTitle(currentDate)

    htmlSections.push(buildSection(section, capitalise(title), cses))
    foundFree = objectSome(section, k => k.full) ? true : foundFree
  }

  htmlSections.push(buildSection(sections.qa, 'QA', cses, true))
  htmlSections.push(buildSection(sections.xb, 'XB', cses, true))

  return buildHeaders(cses) + '<div class="Wrapper">' + htmlSections.join('') + '</div>'
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

module.exports = buildUI
