import { save } from './lib/util'

document.querySelector('.save').addEventListener('click', async function saveCode (e) {
  e.preventDefault()
  const auth = document.querySelector('.auth').value
  if (auth) {
    await save({ auth })
    document.body.innerHTML = 'Saved!'
  }
})
