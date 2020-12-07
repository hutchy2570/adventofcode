const fs = require('fs')

const parseLine = (acc, line) => {
  if (line.trim() === '') {
    acc.push({ set: new Set(), start: true })
  } else {
    const parts = line.split('')
    if (acc[acc.length - 1].start) {
      parts.forEach((part) => {
        acc[acc.length - 1].set.add(part)
      })
      acc[acc.length - 1].start = false
      return acc
    }
    if (acc[acc.length - 1].set.size === 0) {
      return acc
    }
    const intersect = new Set()
    parts.forEach((part) => {
      if (acc[acc.length - 1].set.has(part)) {
        intersect.add(part)
      }
    })
    acc[acc.length - 1].set = intersect
    return acc
  }

  return acc
}

const run = () => {
  const input = fs
    .readFileSync('day6-part2/input.txt')
    .toString()
    .split('\n')
    .reduce(parseLine, [{ set: new Set(), start: true }])

  // console.log(input)
  const count = input.reduce((acc, v) => acc + v.set.size, 0)

  console.log(count)
}

run()
