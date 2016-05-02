import request from './request'

export default async function getCseQueue (cse, auth) {
  var path = `tasks?workspace=896401739841&completed_since=now&assignee=${cse.id}`
  var { data: tasks } = await request(path, auth, 'GET')

  var queue = { 'new': [] }
  var currentSection = 'new'
  tasks.forEach(function (task) {
    if (/:$/i.test(task.name)) {
      currentSection = task.name
      queue[currentSection] = []
    } else {
      const url = `https://app.asana.com/0/${cse.id}/${task.id}`
      queue[currentSection].push({
        name: task.name,
        url: url
      })
    }
  })
  return {
    [cse.name]: queue
  }
}

