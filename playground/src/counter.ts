import { generate } from '@moeyua/cipher'

export function setupCounter(element: HTMLButtonElement) {
  let counter = ''
  const setCounter = () => {
    counter = generate(128)
    element.textContent = `${counter}`
  }

  element.addEventListener('click', () => setCounter())
  setCounter()
}
