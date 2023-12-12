import { readFileSync } from "fs";
import * as path from 'path';
import { performance } from "perf_hooks";

const input: number[][] = readFileSync(path.join(__dirname, "input"), "utf-8")
    .split("\n")
    .map(l => (l.match(/-?\d+/g)?.map(v => parseInt(v, 10)) || []) )

const hasReachedEnd = (values: number[]): boolean => {
    for (let i = 0, max = values.length - 1; i < max; i++ ) {
        if (values[i] !== 0) {
            return false;
        }
    }

    return true;
}

const computeTriangle = (values: number[]): number[][] => {
    const rows = [values];
    let computedRow = values;
    while (!hasReachedEnd(computedRow)) {
        computedRow = calculateDiffs(computedRow);
        // console.log(computedRow);
        rows.push(computedRow);
    }

    return rows;
}

const calculateDiffs = (values: number[]): number[] => {
    const diffs = [];
    for (let i = 0, max = values.length - 1; i < max; i++ ) {
        diffs.push(values[i+1] - values[i]);
    }

    return diffs;
}

// Part One
// console.log(input);
// let sum = 0;
// for (let i = 0, max = input.length; i < max; i++) {
//     const triangle = computeTriangle(input[i]);
//     // console.log(triangle);
//     // break;
//     triangle[triangle.length - 1].push(0);
//     // console.log(triangle);
//     for (let j = triangle.length - 2; j >=0 ; j--) {
//         triangle[j].push(triangle[j][triangle[j].length - 1] + triangle[j+1][triangle[j+1].length - 1]);
//     }
//
//     //console.log(triangle);
//     sum += triangle[0][triangle[0].length - 1];
// }
//
// console.log(sum);
let sum = 0;

// Part two
for (let i = 0, max = input.length; i < max; i++) {
    const triangle = computeTriangle(input[i]);
    triangle[triangle.length - 1].unshift(0);
    for (let j = triangle.length - 2; j >=0 ; j--) {
        triangle[j].unshift(triangle[j][0] - triangle[j+1][0]);
    }
    sum += triangle[0][0];
}

console.log(sum);