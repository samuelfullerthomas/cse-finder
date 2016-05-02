import { endpoint } from '../config'

export default function request (url, auth, type) {
  return new Promise(function (resolve, reject) {
    const xhr = new window.XMLHttpRequest()
    xhr.onload = () => resolve(xhr.response)
    xhr.onerror = reject
    xhr.open(type, endpoint + url)
    xhr.setRequestHeader('Authorization', 'Bearer ' + auth)
    xhr.responseType = 'json'
    xhr.send()
  })
}
