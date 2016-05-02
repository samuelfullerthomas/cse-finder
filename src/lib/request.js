import { endpoint } from '../config'

export default function request (url, auth, type) {
  return new Promise(function (resolve) {
    var xhr = new window.XMLHttpRequest()
    xhr.onload = function () { resolve(xhr.response) }
    xhr.onerror = function (e) { throw e }
    xhr.open(type, endpoint + url)
    xhr.setRequestHeader('Authorization', 'Bearer ' + auth)
    xhr.responseType = 'json'
    xhr.send()
  })
}
