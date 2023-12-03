const readline = require('readline');
const fs = require('fs');

const input = readline.createInterface({
    input: fs.createReadStream('input')
});

const config = {
    'red': 12,
    'green': 13,
    'blue': 14,

    isValid(cubes: string) {
        console.log(cubes);
        const [red, green, blue] = this.extract(cubes);

        console.debug(' - red = ', red);
        console.debug(' - green = ', green);
        console.debug(' - blue = ', blue);

        return red <= this.red && green <= this.green && blue <= this.blue;
    },

    extract(cubes: string) {
        let green = (cubes.match(/(\d+)\s*green/gm) || []).map((c) => parseInt(c)).reduce((n, p) => n+p, 0);
        let red = (cubes.match(/(\d+)\s*red/gm) || []).map((c) => parseInt(c)).reduce((n, p) => n+p, 0);
        let blue = (cubes.match(/(\d+)\s*blue/gm) || []).map((c) => parseInt(c)).reduce((n, p) => n+p, 0);

        return [red, green, blue];
    }
}
let sum = 0;
// Part one
// input.on('line', (line) => {
//     const [game, rounds] = line.split(':');
//
//     console.log('Game = ', game);
//     console.log('Rounds = ', rounds)
//     let consider = true;
//     for (let round of rounds.split(';')) {
//         //console.log("round = ", round);
//         if (!config.isValid(round)) {
//             consider = false
//             break;
//         }
//     }
//     if (consider) {
//         const matches = game.match(/(\d+)/);
//
//         sum += (matches ? parseInt(matches[0], 10) : 0);
//     } else {
//         console.log('> Game - SKIP');
//     }
//     console.debug(sum);
// });

// Part two
input.on('line', (line: string) => {
    const [game, rounds] = line.split(':');

    console.log('Game = ', game);
    console.log('Rounds = ', rounds)
    let consider = true;
    let minRed = 1, minGreen = 1, minBlue = 1;
    for (let round of rounds.split(';')) {
        const [red, green, blue] = config.extract(round);
        minRed = red > minRed ? red : minRed;
        minGreen = green > minGreen ? green : minGreen;
        minBlue = blue > minBlue ? blue : minBlue;
    }

    console.log('red = ', minRed);
    console.log('green = ', minGreen);
    console.log('blue = ', minBlue);

    console.log('number = ', (minRed * minGreen * minBlue))

    sum += (minRed * minGreen * minBlue);
    console.debug(sum);
});