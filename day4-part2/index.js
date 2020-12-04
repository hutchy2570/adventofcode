const fs = require('fs')
const { parse } = require('path')

// byr (Birth Year) - four digits; at least 1920 and at most 2002.
// iyr (Issue Year) - four digits; at least 2010 and at most 2020.
// eyr (Expiration Year) - four digits; at least 2020 and at most 2030.
// hgt (Height) - a number followed by either cm or in:
// If cm, the number must be at least 150 and at most 193.
// If in, the number must be at least 59 and at most 76.
// hcl (Hair Color) - a # followed by exactly six characters 0-9 or a-f.
// ecl (Eye Color) - exactly one of: amb blu brn gry grn hzl oth.
// pid (Passport ID) - a nine-digit number, including leading zeroes.

const required = {
  byr: (v) => v && v >= 1920 && v <= 2002,
  iyr: (v) => v && v >= 2010 && v <= 2020,
  eyr: (v) => v && v >= 2020 && v <= 2030,
  hgt: (v) => {
    const matches = v && v.match(new RegExp('(\\d+)(cm|in)'))
    if (matches) {
      if (matches[2] === 'cm') {
        return matches[1] >= 150 && matches[1] <= 193
      } else {
        return matches[1] >= 59 && matches[1] <= 76
      }
    }
    return false
  },
  hcl: (v) => v && !!v.match(new RegExp('^#[0-9a-f]{6}$')),
  ecl: (v) =>
    v && ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(v),
  pid: (v) => v && v.length === 9 && v > 0,
}

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
    .readFileSync('day4-part2/input.txt')
    .toString()
    .split('\n')
    .reduce(parseLine, [{}])

  const valid = input.filter((v) => {
    const fields = Object.keys(v)
    if ([7, 8].includes(fields.length)) {
      const allRequired = Object.entries(required).every(([key, validator]) => {
        const val = v[key]
        return validator(val)
      })
      if (allRequired && fields.length === 8) {
        return fields.includes('cid')
      }
      return allRequired
    }
    return false
  })

  //   console.log(valid)
  console.log(valid.length)
}

run()
