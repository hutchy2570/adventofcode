const fs = require('fs')

const RIGHT = 3
const DOWN = 1

const run = () => {
    const input = fs.readFileSync('day3-part1/input.txt').toString().split('\n').map((s) => s.split(''))
    const canvas = []
    const addToCanvas = () => {
        input.forEach((v, i) => {
            if (!canvas[i]) {
                canvas[i] = []
            }

            canvas[i] = [...canvas[i], ...input[i]]
        })
    }

    addToCanvas()

    let x = 0
    let y = 0

    let trees = 0
    let loops = 0

    input.forEach((v, i) => {
        loops += 1
        if (i + 1 >= input.length) {
            return
        }

        x += RIGHT
        y += DOWN

        if (x >= canvas[y].length) {
            addToCanvas()
        }

        if (canvas[y][x] === '#') {
            trees += 1
            canvas[y][x] = 'X'
        } else {
            canvas[y][x] = 'O'
        }
    })

    console.log(trees)
}

run()
