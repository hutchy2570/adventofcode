const fs = require('fs')

const RIGHT = 3
const DOWN = 1

const howManyTrees = (input, right, down) => {
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
        if (y + 1 >= input.length) {
            return
        }

        x += right
        y += down

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

    return trees
}

const howManyTreesEfficient = (input, right, down) => {
    const height = input.length
    const width = input[0].length

    let x = 0
    let y = 0

    let trees = 0

    while (y + 1 < height) {
        x += right
        y += down

        const iX = x % width

        if (input[y][iX] === '#') {
            trees += 1
        }
    }

    return trees
}

const run = () => {
    const input = fs.readFileSync('day3-part2/input.txt').toString().split('\n').map((s) => s.split(''))

    const routes = [
        [1, 1],
        [3, 1],
        [5, 1],
        [7, 1],
        [1, 2]
    ]

    // console.log(howManyTrees(input, 1, 2))
    // console.log(howManyTreesEfficient(input, 1, 2))

    // console.log(routes.map(([right, down]) => howManyTrees(input, right, down)).reduce((a, v) => a * v, 1))
    console.log(routes.map(([right, down]) => howManyTreesEfficient(input, right, down)).reduce((a, v) => a * v, 1))
}

run()
