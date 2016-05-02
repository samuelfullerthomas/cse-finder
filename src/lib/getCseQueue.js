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
      queue[currentSection].push(task.name)
    }
  })
  return {
    [cse.name]: queue
  }
}

