var buildSection = require('./buildSection')
var buildHeaders = require('./buildHeaders')
var ordinalise = require('../util/ordinalise')

function buildUI (sections, cses) {
  var currentDate = new Date()
  var section
  var title
  var foundFree = false

  var htmlSections = []

  htmlSections.push(buildHeaders(cses))

  while (htmlSections.length < 10 || !foundFree) {
    section = sections[dateToKey(currentDate)] || {}
    title = dateToTitle(currentDate)

    htmlSections.push(buildSection(section, title, cses))
    if (objectSome(section, function (k) { return k.status === 'free' })) {
      foundFree = true
    }
    currentDate = getNextDay(currentDate)
  }

  return htmlSections.join('')
}

function getNextDay (base) {
  var next = new Date(base.getTime())
  do {
    next.setUTCDate(next.getUTCDate() + 1)
  } while (!workingDay(next))
  return next
}

function workingDay (date) {
  var day = date.getUTCDay()
  if (day === 0 || day === 6) {
    return false
  }
  if (isBankHoliday(date)) {
    return false
  }
  return true
}

function isBankHoliday (date) {
  var bankHolidays = [
    [5 - 1, 2],
    [5 - 1, 30],
    [8 - 1, 29],
    [12 - 1, 26],
    [12 - 1, 27]
  ]
  return bankHolidays.some(function (b) {
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

function objectSome (obj, fn) {
  return Object.keys(obj).some(function (key) {
    return fn(obj[key])
  })
}

module.exports = buildUI
