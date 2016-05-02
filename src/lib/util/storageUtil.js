export function retrieve (obj) {
  return new Promise(r => window.chrome.storage.local.get(obj, r))
}

export function save (obj) {
  return new Promise(r => window.chrome.storage.local.set(obj, r))
}
