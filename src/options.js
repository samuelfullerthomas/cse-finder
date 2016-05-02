import { save } from './lib/util'

document.querySelector('.save').addEventListener('click', function (e) {
  e.preventDefault()
  var auth = document.querySelector('.auth').value
  if (auth) {
    save({ auth }, () => {
      document.body.innerHTML = 'Saved!'
    })
  }
})
