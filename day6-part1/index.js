const fs = require('fs')

const parseLine = (acc, line) => {
  if (line.trim() === '') {
    acc.push(new Set())
  } else {
    const parts = line.split('')
    parts.forEach((part) => {
      acc[acc.length - 1].add(part)
    })
  }

  return acc
}

const run = () => {
  const input = fs
    .readFileSync('day6-part1/input.txt')
    .toString()
    .split('\n')
    .reduce(parseLine, [new Set()])

  const count = input.reduce((acc, v) => acc + v.size, 0)

  console.log(count)
}

run()
