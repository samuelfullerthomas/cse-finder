var request = require('./request')

async function getCseQueue (cse, auth) {
  var path = 'tasks?workspace=896401739841&completed_since=now&assignee=' + cse.id
  var json = await request(path, auth, 'GET')
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
  return output
}

module.exports = getCseQueue
