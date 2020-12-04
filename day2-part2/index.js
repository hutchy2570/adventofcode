const fs = require('fs')

const inputPattern = new RegExp('(\\d+)-(\\d+) (\\w): (\\w+)')

const run = () => {
  const input = fs
    .readFileSync('day2-part1/input.txt')
    .toString()
    .split('\n')
    .map((s) => {
      const [, first, second, char, password] = s.match(inputPattern)
      return {
        first,
        second,
        char,
        password,
      }
    })

  const valid = input.filter(({ first, second, char, password }) => {
    const hasFirst = password.charAt(first - 1) === char
    const hasSecond = password.charAt(second - 1) === char

    return !(hasFirst && hasSecond) && (hasFirst || hasSecond)
  })

  console.log(valid.length)
}

run()
