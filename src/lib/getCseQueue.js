var request = require('./request')

function getCseQueue (cse, auth) {
  return new Promise(function (resolve) {
    var path = 'tasks?workspace=896401739841&completed_since=now&assignee=' + cse.id
    return request(path, auth, 'GET', function (json) {
      var tasks = json.data

      var queue = { 'new': [] }
      var currentSection = 'new'
      tasks.forEach(function (task) {
        if (/:$/i.test(task.name)) {
          currentSection = task.name
          queue[currentSection] = []
        } else {
          queue[currentSection].push(task.name)
        }
      })
      var output = {}
      output[cse.name] = queue
      resolve(output)
    })
  })
}

module.exports = getCseQueue
