import { generate } from '@moeyua/cipher'

export function setupCounter(element: HTMLButtonElement) {
  let counter = ''
  const setCounter = () => {
    counter = generate(10, 'abcdefg')
    element.innerHTML = `count is ${counter}`
  }

  element.addEventListener('click', () => setCounter())
  setCounter()
}
