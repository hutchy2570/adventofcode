const fs = require('fs')

const required = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid']

const parseLine = (acc, line) => {
  if (line.trim() === '') {
    acc.push({})
  } else {
    const parts = line.split(' ')
    parts.forEach((part) => {
      const [key, value] = part.split(':')
      acc[acc.length - 1][key] = value
    })
  }

  return acc
}

const run = () => {
  const input = fs
    .readFileSync('day4-part1/input.txt')
    .toString()
    .split('\n')
    .reduce(parseLine, [{}])

  const valid = input.filter((v) => {
    const fields = Object.keys(v)
    if ([7, 8].includes(fields.length)) {
      const allRequired = required.every((r) => fields.includes(r))
      if (allRequired && fields.length === 8) {
        return fields.includes('cid')
      }
      return allRequired
    }
    return false
  })

  // console.log(valid)
  console.log(valid.length)
}

run()
