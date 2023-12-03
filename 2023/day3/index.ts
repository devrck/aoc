import { readFileSync } from "fs";

interface Point {
    x: number,
    y: number
}

const grid: string[][] = readFileSync("input", "utf-8")
    .split("\n")
    .map((l) => l.split(""))
;
const maxY = grid.length;
const maxX = grid[0].length;
const foundNumbers: {
    position: {
        from: Point,
        to: Point,
    },
    value: number
}[] = [];
const foundSymbols : {
    position: Point,
    value: string
}[] = [];
const isCharNumber = (c: string) => !isNaN(parseInt(c, 10));
const createBox = (point: Point) => {
    return {
        'topLeft': {
            x: point.x - 1,
            y: point.y + 1
        },
        'toRight': {
            x: point.x + 1,
            y: point.y + 1
        },
        'bottomLeft': {
            x: point.x - 1,
            y: point.y - 1
        },
        'bottomRight': {
            x: point.x + 1,
            y: point.y - 1
        },
    }
};

// console.log(grid);

for (let y = 0; y < maxY; ++y) {
    let x = 0;
    while (x < maxX) {
        if (grid[y][x] === ".") {
            ++x;
            continue;
        }
        if (!isCharNumber(grid[y][x])) {
            foundSymbols.push({
                position: {
                    x, y
                },
                value: grid[y][x]
            });
            ++x;
            continue;
        }

        const from: number = x;
        let number: string = "";

        while (isCharNumber(grid[y][x])) {
            number += grid[y][x];
            ++x;

            if (x >= maxX) {
                break;
            }
        }

        foundNumbers.push({
            position: {
                from: {
                    y,
                    x: from,
                },
                to: {
                    y,
                    x: x - 1,
                }
            },
            value: parseInt(number, 10),
        });
    }
}

// Part one
let sum = 0;
// for (const symbol of foundSymbols) {
//     const boxAroundSymbol = createBox(symbol.position);
//     for (const number of foundNumbers) {
//         if (
//             number.position.from.x >= boxAroundSymbol.bottomLeft.x &&
//             number.position.from.x <= boxAroundSymbol.bottomRight.x &&
//             number.position.from.y >= boxAroundSymbol.bottomLeft.y &&
//             number.position.from.y <= boxAroundSymbol.topLeft.y
//         ) {
//             sum += number.value;
//         } else if (
//             number.position.to.x >= boxAroundSymbol.bottomLeft.x &&
//             number.position.to.x <= boxAroundSymbol.bottomRight.x &&
//             number.position.to.y >= boxAroundSymbol.bottomLeft.y &&
//             number.position.to.y <= boxAroundSymbol.topLeft.y
//         ) {
//             sum += number.value;
//         } else if (
//             number.position.from.x >= boxAroundSymbol.bottomLeft.x &&
//             number.position.from.x <= boxAroundSymbol.bottomRight.x &&
//             number.position.from.y >= boxAroundSymbol.bottomLeft.y &&
//             number.position.from.y <= boxAroundSymbol.topLeft.y
//
//         ) {
//             sum += number.value;
//         } else if (
//             number.position.to.x >= boxAroundSymbol.bottomLeft.x &&
//             number.position.to.x <= boxAroundSymbol.bottomRight.x &&
//             number.position.to.y >= boxAroundSymbol.bottomLeft.y &&
//             number.position.to.y <= boxAroundSymbol.topLeft.y
//         ) {
//             sum += number.value;
//         }
//     }
// }

// Part two
for (const symbol of foundSymbols) {
    if (symbol.value !== '*') {
        continue;
    }

    const intersectedNumbersWithBox: number[] = [];
    const boxAroundSymbol = createBox(symbol.position);
    for (const number of foundNumbers) {
        if (
            number.position.from.x >= boxAroundSymbol.bottomLeft.x &&
            number.position.from.x <= boxAroundSymbol.bottomRight.x &&
            number.position.from.y >= boxAroundSymbol.bottomLeft.y &&
            number.position.from.y <= boxAroundSymbol.topLeft.y
        ) {
            intersectedNumbersWithBox.push(number.value);
        } else if (
            number.position.to.x >= boxAroundSymbol.bottomLeft.x &&
            number.position.to.x <= boxAroundSymbol.bottomRight.x &&
            number.position.to.y >= boxAroundSymbol.bottomLeft.y &&
            number.position.to.y <= boxAroundSymbol.topLeft.y
        ) {
            intersectedNumbersWithBox.push(number.value);
        } else if (
            number.position.from.x >= boxAroundSymbol.bottomLeft.x &&
            number.position.from.x <= boxAroundSymbol.bottomRight.x &&
            number.position.from.y >= boxAroundSymbol.bottomLeft.y &&
            number.position.from.y <= boxAroundSymbol.topLeft.y

        ) {
            intersectedNumbersWithBox.push(number.value);
        } else if (
            number.position.to.x >= boxAroundSymbol.bottomLeft.x &&
            number.position.to.x <= boxAroundSymbol.bottomRight.x &&
            number.position.to.y >= boxAroundSymbol.bottomLeft.y &&
            number.position.to.y <= boxAroundSymbol.topLeft.y
        ) {
            intersectedNumbersWithBox.push(number.value);
        }
    }

    if (intersectedNumbersWithBox.length !== 2) {
        continue;
    }

    sum += (intersectedNumbersWithBox[0] * intersectedNumbersWithBox[1]);
}

console.log(sum);



