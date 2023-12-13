import { readFileSync } from "fs";
import * as path from 'path';

interface Point {
    x: number,
    y: number,
}

const grid: string[][] = readFileSync(path.join(__dirname, "input"), "utf-8")
    .split("\n")
    .map((l) => l.split(""))
;

const maxI = grid.length, maxJ = grid[0].length;
const emptyRows = Array<number>(maxI).fill(1);
const emptyColumns = Array<number>(maxJ).fill(1);

const galaxies: Point[] = [];
for (let i = 0; i < maxI; i++) {
    for (let j = 0; j < maxJ; j++) {
        if (grid[i][j] === '#') {
            galaxies.push({
                y: i, x: j
            });
            emptyColumns[j] = 0;
            emptyRows[i] = 0;
        }
    }
}

const galaxySize = galaxies.length;
let sum = 0;
for (let i = 0; i < galaxySize - 1; i++) {
    for (let j = i + 1; j < galaxySize; j++) {
        const manhattan = Math.abs(galaxies[i].x - galaxies[j].x) + Math.abs(galaxies[i].y - galaxies[j].y);
        const emptyRowsInBetween = emptyRows.slice(
            galaxies[i].y > galaxies[j].y ? galaxies[j].y: galaxies[i].y,
            (galaxies[i].y > galaxies[j].y ? galaxies[i].y: galaxies[j].y)
        ).reduce((v, a) => a+v, 0);
        const emptyColumnsInBetween = emptyColumns.slice(
            galaxies[i].x > galaxies[j].x ? galaxies[j].x: galaxies[i].x,
            (galaxies[i].x > galaxies[j].x ? galaxies[i].x: galaxies[j].x)
        ).reduce((v, a) => a+v, 0);

        // Part One
        // sum += (manhattan + emptyRowsInBetween + emptyColumnsInBetween)

        // Part two
        sum += (manhattan + 999999 * (emptyRowsInBetween + emptyColumnsInBetween))
    }
}

console.log(sum);