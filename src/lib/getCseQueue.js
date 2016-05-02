import request from './request'

export default async function getCseQueue (cse, auth) {
  const path = `tasks?workspace=896401739841&completed_since=now&assignee=${cse.id}`
  const { data: tasks } = await request(path, auth, 'GET')

  const queue = { 'newtasks': [] }
  let currentSection = 'newtasks'
  tasks.forEach(function (task) {
    if (/:$/i.test(task.name)) {
      currentSection = task.name
      queue[currentSection] = []
    } else {
      queue[currentSection].push({
        name: task.name,
        url: `https://app.asana.com/0/${cse.id}/${task.id}`
      })
    }
  })
  return {
    [cse.name]: queue
  }
}

