const fs = require('fs')

const TOTAL = 2020;

const run = () => {
    const numbers = fs.readFileSync('day1-part2/input.txt').toString().split('\n').map((s) => parseInt(s));

    let a
    let b
    let c

    numbers.some((aCandidate, i) => numbers.some((bCandidate, j) => {
        if (i === j) {
            return false
        }
        
        return numbers.some((cCandidate, k) => {
            if (i == k || j === k) {
                return false
            }

            if (aCandidate + bCandidate + cCandidate === TOTAL) {
                a = aCandidate
                b = bCandidate
                c = cCandidate
                return true
            }

            return false
        })
    }))

    console.log(a, b, c)
    console.log(a + b + c)
    console.log(a * b * c)
}

run()
