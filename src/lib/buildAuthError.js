import { createElement } from './util'

export default function authError () {
  const $authError = createElement('<div class="AuthError">Click here to set your auth code!</div>')
  $authError.addEventListener('click', () => window.chrome.runtime.openOptionsPage())
  return $authError
}
