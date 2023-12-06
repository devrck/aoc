import { readFileSync } from "fs";

const findNumberOfWays = (time: number, distance: number) => {
    let skip = 0;
    for (let i = 1; i <= time; i++) {
        if (i * (time - i) > distance) {
            return time - skip * 2 -1;
        }
        skip++;
    }

    return 0;
}
// Part one
const lines: number[][] = readFileSync("input", "utf-8")
    .split("\n")
    .map(l => l.replace(/.*:/, ''))
    .map(l => (l.match(/\d+/g)?.map(v => parseInt(v, 10)) || []) )
;

let sum = 1;
for (let i = 0, max = lines[0].length; i < max; i++) {
    sum *= findNumberOfWays(lines[0][i], lines[1][i])
}

console.log('part one = ', sum);

// Part two
const timeAndDistance: number[] = readFileSync("input", "utf-8")
    .split("\n")
    .map(l => l.replace(/.*:/, '').replace(/\s/g, ''))
    .map(n => parseInt(n, 10))
;

console.log('part two = ', findNumberOfWays(timeAndDistance[0], timeAndDistance[1]));