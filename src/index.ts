// const DIGITS = '0123456789'

// const CAPITAL_LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

// const SMALL_LETTERS = 'abcdefghijklmnopqrstuvwxyz'

const SAFE_CHARSET = '!#$%&()*+,-.23456789:;<=>?@'
  + 'ABCDEFGHIJKLMNPQRSTUVWXY_'
  + 'abcdefghijkmnpqrstuvwxy'

/*
   * Pool of cryptographically secure random bytes retrieved by
   * window.crypto.getRandomValues().
   */
const random_pool = new Uint8Array(16)

/*
 * Index to the next byte available in the pool.
 */
let random_pool_next = random_pool.length

/**
 * Generates and displays the password.
 * @param complexity number 1 ~ 256 bits
 */
export function generate(complexity: number = 49, random_chars_text: string = SAFE_CHARSET) {
  // Determines symbols to use:
  const symbols = parseCharacterSymbols(random_chars_text)

  // Generate password:
  return generatePhrase(symbols, complexity)
}

/**
 * Parses the given string of chars returning only the unique characters.
 * White spaces are removed.
 * @param s string    String of arbitrary characters.
 * @return string[]   Unique characters, sorted.
 */
function parseCharacterSymbols(s: string) {
  const b: string[] = []
  for (let i = 0; i < s.length; i++) {
    const c = s[i].trim()
    if (c.length === 1 && !b.includes(c))
      b.push(c)
  }
  return b.sort()
}

/**
 * Returns a cryptographically secure random string of syllables of the given
 * complexity.
 * @param  syllables string[]        Array of syllables.
 * @param complexity int complexity  Equivalent length in bits of the generated password.
 * @return string Generated password.
 */
function generatePhrase(syllables: string[], complexity: number) {
  if (syllables.length < 2) {
    console.error('ERROR: there must be at least 2 characters or syllables.')
    return ''
  }
  const n = Math.ceil(complexity * Math.log(2) / Math.log(syllables.length))
  let p = ''
  for (let i = 1; i <= n; i++) {
    const c = syllables[getSecureRandomInt(0, syllables.length - 1)]
    p = p + c
  }
  return p
}

/**
 * Returns a cryptographically secure random integer number.
 * @param min int   Expected minimum value.
 * @param max int   Expected maximum value.
 * @return int Secure random int number in [min,max].
 */
function getSecureRandomInt(min: number, max: number) {
  const range = max - min
  let x, mask
  do {
    x = getSecureRandomByte()
    mask = 255
    while (mask < range) {
      x = (x << 8) + getSecureRandomByte()
      mask = (mask << 8) + 255
    }
  } while (x >= mask - mask % (range + 1))
  return x % (range + 1) + min
}

/**
 * Returns a cryptographically secure random byte.
 * @return int   Random value in [0,255].
 */
function getSecureRandomByte() {
  if (random_pool_next >= random_pool.length) {
    window.crypto.getRandomValues(random_pool)
    random_pool_next = 0
  }
  return random_pool[random_pool_next++]
}
