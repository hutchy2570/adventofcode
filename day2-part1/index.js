const fs = require('fs')

const inputPattern = new RegExp('(\\d+)-(\\d+) (\\w): (\\w+)');

const run = () => {
    const input = fs.readFileSync('day2-part1/input.txt').toString().split('\n').map((s) => {
        const [, lower, upper, char, password] = s.match(inputPattern)
        return {
            lower,
            upper,
            char,
            password
        }
    })

    let valid = 0

    input.forEach(({lower, upper, char, password}) => {
        const numOccurrances = (password.match(new RegExp(char, 'g')) || []).length

        if (numOccurrances >= lower && numOccurrances <= upper) {
            valid += 1
        }
    })

    console.log(valid)
}

run()
