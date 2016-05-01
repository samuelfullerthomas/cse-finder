var buildSection = require('./buildSection')
var buildHeaders = require('./buildHeaders')
var ordinalise = require('./ordinalise')

function buildUI (sections, cses) {
  var currentDate = new Date()
  var section
  var title
  var foundFree = false

  var htmlSections = []

  htmlSections.push(buildHeaders(cses))

  while (htmlSections.length < 6 || !foundFree) {
    currentDate = getNextDay(currentDate)
    section = sections[dateToKey(currentDate)] || {}
    title = dateToTitle(currentDate)

    htmlSections.push(buildSection(section, title, cses))
    if (objectSome(section, function (k) { return k.status === 'free' })) {
      foundFree = true
    }
  }

  return htmlSections.join('')
}

function getNextDay (base) {
  var bankHolidays = [
    [5 - 1, 2]
  ]
  var next = new Date(base.getTime())
  do {
    next.setUTCDate(next.getUTCDate() + 1)
  } while (next.getUTCDay() === 0 || next.getUTCDay() === 6 || bankHolidays.some(function (b) { return next.getUTCDate() === b[1] && next.getUTCMonth() === b[0]}))
  return next
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
