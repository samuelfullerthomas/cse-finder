export function age (time) {
  const diff = now() - time
  return Math.floor(diff / 60000)
}

export function now () {
  return (new Date()).getTime()
}

export function ordinalise (i) {
  const j = i % 10
  const k = i % 100
  if (j === 1 && k !== 11) {
    return i + 'st'
  }
  if (j === 2 && k !== 12) {
    return i + 'nd'
  }
  if (j === 3 && k !== 13) {
    return i + 'rd'
  }
  return i + 'th'
}

export function isWorkingDay (date) {
  const day = date.getUTCDay()
  return day !== 0 && day !== 6 && !isBankHoliday(date)
}

export function isBankHoliday (d) {
  const bankHolidays = [
    [2016, 5 - 1, 2],
    [2016, 5 - 1, 30],
    [2016, 8 - 1, 29],
    [2016, 12 - 1, 26],
    [2016, 12 - 1, 27],
    [2017, 1 - 1, 2],
    [2017, 4 - 1, 14],
    [2017, 4 - 1, 17],
    [2017, 5 - 1, 1],
    [2017, 5 - 1, 29],
    [2017, 8 - 1, 28],
    [2017, 12 - 1, 25],
    [2017, 12 - 1, 26]
  ]

  return bankHolidays.some(b => {
    const [year, month, date] = b
    return d.getUTCDate() === date && d.getUTCMonth() === month && d.getUTCFullYear() === year
  })
}
