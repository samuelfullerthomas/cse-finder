import objectMap from 'slapdash/src/objectMap'

export default function parseSections (cses) {
  return objectMap(cses, function (sections, cse) {
    var newSections = {}
    Object.keys(sections).forEach(function (oldSectionName) {
      var newSectionName = matchOtherSections(oldSectionName) || matchDateSection(oldSectionName)
      if (newSectionName) {
        const isDateSection = newSectionName !== 'qa' && newSectionName !== 'xb' && newSectionName !== 'newtasks'
        newSections[newSectionName] = {
          tasks: sections[oldSectionName],
          full: isDateSection ? /ooo|bank|leave|full/i.test(oldSectionName) : false,
          free: isDateSection ? !/ooo|bank|leave|full/i.test(oldSectionName) : false
        }
      }
    })
    return newSections
  })
}

function matchDateSection (title) {
  var regex = /(monday|tuesday|wednesday|thursday|friday)[^0-9]*(\d*)(?:st|nd|rd|th)/i
  var matches = regex.exec(title)
  if (!matches || matches.length < 3) return false
  return (matches[1] + matches[2]).toLowerCase()
}

function matchOtherSections (title) {
  var matches = /(newtasks|qa|xb)/i.exec(title)
  if (!matches || matches.length < 2) return false
  return matches[1].toLowerCase()
}
