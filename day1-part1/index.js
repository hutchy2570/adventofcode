const fs = require('fs')

const TOTAL = 2020;

const run = () => {
    const numbers = fs.readFileSync('day1-part1/input.txt').toString().split('\n').map((s) => parseInt(s));

    let a
    let b

    numbers.some((aCandidate, i) => numbers.some((bCandidate, j) => {
        if (i === j) {
            return false
        }

        if (aCandidate + bCandidate === TOTAL) {
            a = aCandidate
            b = bCandidate
            return true
        }

        return false
    }))

    console.log(a * b)
}

run()
