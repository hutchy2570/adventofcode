const fs = require('fs')
const { floor, ceil } = Math

const rowSeatRegexp = new RegExp('([BF]+)([RL]+)')

const minMax = (char, min, max) => {
  switch (char) {
    case 'F':
    case 'L': {
        const diff = max - min
        return [min, floor(max - diff / 2)]
      }
    case 'B':
    case 'R': {
        const diff = max - min
        return [ceil(max - diff / 2), max]
      }
    default:
      throw new Error('I messed up')
  }
}

const find = (str, min, max) => {
  const char = str.charAt(0)
  const remainder = str.substring(1, str.length)
  
  const [newMin, newMax] = minMax(char, min, max)
  
  // console.log(char, remainder, newMin, newMax)
  if (remainder.length > 0) {
    return find(remainder, newMin, newMax)
  }

  return newMax
}

const calculateSeat = (pass) => {
  const [, row, seat] = pass.match(rowSeatRegexp)

  // console.log(row, seat)

  const rowNum = find(row, 0, 127)
  const seatNum = find(seat, 0, 7)
  // console.log(`${pass} Row ${rowNum} Seat ${seatNum} Result ${(rowNum * 8) + seatNum}`)

  return (rowNum * 8) + seatNum
}

const run = () => {
  const seats = fs
    .readFileSync('day5-part1/input.txt')
    .toString()
    .split('\n')
    .map((v) => parseInt(calculateSeat(v), 10))
    .sort((a, b) => b - a)

  console.log(seats[0])
}

run()
