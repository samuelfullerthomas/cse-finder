function mapBySection (cses) {
  var sections = {}
  Object.keys(cses).forEach(function (cse) {
    Object.keys(cses[cse]).forEach(function (section) {
      sections[section] = sections[section] || {}
      sections[section][cse] = cses[cse][section]
    })
  })
  return sections
}

module.exports = mapBySection
