import { readFileSync } from "fs";
import { performance } from "perf_hooks";

const input = readFileSync("input", "utf-8")
    .split("\n");

const direction = input[0].trim();
const directionLength = direction.length;

const nodes = new Map<String, { left: string, right: string }>();
const startingPoints: string[] = [];
for (let i = 2, max = input.length; i < max; i++) {
    if (!input[i].length) {
        continue;
    }
    const [,name, left, right] = input[i].match(/(\w+) = \((\w+),\s(\w+)\)/smi) || [];

    if (name.endsWith('A')) {
        startingPoints.push(name);
    }

    if (nodes.has(name)) {
        continue;
    }

    nodes.set(name, {left, right});
}
// console.log(nodes);

// Part One
// let i = 0;
// let network = 'AAA';
// const startTime = performance.now();
// while (network !== 'ZZZ') {
//     const w = direction[i++ % directionLength];
//     if (w === 'R') {
//         network = nodes.get(network)!.right;
//     } else {
//         network = nodes.get(network)!.left;
//     }
// }
// console.log(`Exec time ${performance.now() - startTime}ms`)
// console.log(i);

// Part two
const gcd = (a: number, b: number): number => a ? gcd(b % a, a) : b;
const lcm = (a: number, b: number): number => a * b / gcd(a, b);

const paths: number[] = [];
const startTime = performance.now();
for (let network of startingPoints) {
    let i = 0;
    while (!network.endsWith('Z')) {
        const w = direction[i++ % directionLength];
        if (w === 'R') {
            network = nodes.get(network)!.right;
        } else {
            network = nodes.get(network)!.left;
        }
    }
    paths.push(i);
}
const result = paths.reduce(lcm);
console.log(`Exec time ${performance.now() - startTime}ms`)
console.log(result);