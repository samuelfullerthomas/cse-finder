document.querySelector('.save').addEventListener('click', function (e) {
  e.preventDefault()
  var auth = document.querySelector('.auth').value
  if (auth) {
    window.chrome.storage.local.set({
      auth: auth
    }, function () {
      document.body.innerHTML = 'Saved!'
    })
  }
})
