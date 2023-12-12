import { readFileSync } from "fs";
import * as path from 'path';
import { Queue } from 'queue-typescript';

interface Node {
    x: number,
    y: number,
}

class SetWithContentEquality<T> {
    private items: T[] = [];
    private readonly getKey: (item: T) => string;

    constructor(getKey: (item: T) => string) {
        this.getKey = getKey;
    }

    add(item: T): void {
        const key = this.getKey(item);
        if (!this.items.some(existing => this.getKey(existing) === key)) {
            this.items.push(item);
        }
    }

    has(item: T): boolean {
        return this.items.some(existing => this.getKey(existing) === this.getKey(item));
    }

    values(): T[] {
        return [...this.items];
    }
}

const areEqual = (a: Node, b: Node) => a.x === b.x && a.y === b.y;

const grid: string[][] = readFileSync(path.join(__dirname, "input"), "utf-8")
    .split("\n")
    .map((l) => l.split(""))
;
const maxI = grid.length, maxJ = grid[0].length;
const distances = Array<number>(maxI).fill(-1).map(() => Array<number>(maxJ).fill(-1));
console.log({maxI, maxJ})

const getConnectedPipes = (grid: string[][], node: Node) => {
    const nodes: Node[] = [];
    const maxI = grid.length, maxJ = grid[0].length;
    switch (grid[node.y][node.x]) {
        case '|': {
            // connecting north and south
            node.y-1 >= 0 && (nodes.push({y: node.y - 1, x: node.x}));
            node.y+1 < maxI && (nodes.push({y: node.y + 1, x: node.x}));
            break;
        }
        case '-': {
            // connecting east and west.
            node.x-1 >= 0 && (nodes.push({y: node.y, x: node.x - 1}));
            node.x+1 < maxJ && (nodes.push({y: node.y, x: node.x + 1}));
            break;
        }
        case 'L': {
            // connecting north and east.
            node.y-1 >= 0 && (nodes.push({y: node.y-1, x: node.x}));
            node.x+1 < maxJ && (nodes.push({y: node.y, x: node.x + 1}));
            break;
        }
        case 'J': {
            // connecting north and west.
            node.y-1 >= 0 && (nodes.push({y: node.y - 1, x: node.x}));
            node.x-1 >= 0 && (nodes.push({y: node.y, x: node.x - 1}));
            break;
        }
        case '7': {
            // connecting south and west.
            node.y+1 < maxI && (nodes.push({y: node.y + 1, x: node.x}));
            node.x-1 >= 0 && (nodes.push({y: node.y, x: node.x - 1}));
            break;
        }
        case 'F': {
            // connecting south and east.
            node.y+1 < maxI && (nodes.push({y: node.y + 1, x: node.x }));
            node.x+1 < maxJ && (nodes.push({y: node.y, x: node.x + 1}));
            break;
        }
    }

    return nodes;
}

const findStartingPoint = (grid: string[][]): Node => {
    const maxI = grid.length, maxJ = grid[0].length;
    for (let i = 0; i < maxI; i++) {
        for (let j = 0; j < maxJ; j++) {
            if (grid[i][j] === 'S') {
                return {
                    y: i,
                    x: j,
                }
            }
        }
    }

    throw new Error('Couldnt find start');
}

const findStartingPipe = (grid: string[][], startingPoint: Node): string => {
    for (const pipe of ['|', '-', 'L', 'J', 'F', '7']) {
        grid[startingPoint.y][startingPoint.x] = pipe;
        const neighbours = getConnectedPipes(grid, startingPoint);
        //console.log("Finding starting pipe", neighbours);
        if (neighbours.length !== 2) {
            continue;
        }
        let valid = true;
        for (const neighbour of neighbours) {
            console.log(pipe, ' connected to ', grid[neighbour.y][neighbour.x]);
            switch (grid[neighbour.y][neighbour.x]) {
                case '|': {
                    // up & down
                    if (!areEqual(neighbour, {x : startingPoint.x, y: startingPoint.y + 1}) && !areEqual(neighbour, {x: startingPoint.x, y: startingPoint.y - 1})) {
                        valid = false;
                    }
                    break;
                }
                case '-': {
                    // left & right
                    if (!areEqual(neighbour, {y : startingPoint.y, x: startingPoint.x + 1}) && !areEqual(neighbour, {y: startingPoint.y, x: startingPoint.x - 1})) {
                        valid = false;
                    }
                    break;
                }
                case 'L': {
                    // down & left
                    if (!areEqual(neighbour, {x: startingPoint.x - 1 , y: startingPoint.y }) && !areEqual(neighbour, {x: startingPoint.x , y: startingPoint.y + 1 })) {
                        valid = false;
                    }
                    break;
                }
                case 'J': {
                    // down & right
                    if (!areEqual(neighbour, {x: startingPoint.x + 1 , y: startingPoint.y}) && !areEqual(neighbour, {x: startingPoint.x , y: startingPoint.y + 1})) {
                        valid = false;
                    }
                    break;
                }
                case '7': {
                    //up & right
                    if (!areEqual(neighbour, {x: startingPoint.x + 1 , y: startingPoint.y}) && !areEqual(neighbour, {x: startingPoint.x , y: startingPoint.y - 1})) {
                        valid = false;
                    }
                    break;
                }
                case 'F': {
                    // up & left
                    if (!areEqual(neighbour, {x: startingPoint.x - 1 , y: startingPoint.y + 1}) && !areEqual(neighbour, {x: startingPoint.x , y: startingPoint.y - 1})) {
                        valid = false;
                    }
                    break;
                }
                case '.': {
                    valid = false;
                    break;
                }
            }

            if (!valid) {
                break;
            }
        }

        if (valid) {
            return pipe;
        }
    }
    throw new Error('Could not find best starting pipe type');
}

const startingPoint: Node = findStartingPoint(grid);
const bestStartingPointPipe = findStartingPipe(grid, startingPoint);
console.log({
    startingPoint,
    bestStartingPointPipe,
});
distances[startingPoint.y][startingPoint.x] = 0;
const visited = new SetWithContentEquality<Node>(n => `${n.x}-${n.y}`);
visited.add(startingPoint);
const toVisit = new Queue<{from: Node, to: Node}>();
for (const neighbour of getConnectedPipes(grid, startingPoint)) {
    toVisit.enqueue({ from: startingPoint, to: neighbour});
}

let visit: {from: Node, to: Node} = null;
while (visit = toVisit.dequeue()) {
    visited.add(visit.to);
    if (distances[visit.to.y][visit.to.x] !== -1) {
        continue;
    }
    distances[visit.to.y][visit.to.x] = distances[visit.from.y][visit.from.x] + 1;
    for (const neighbour of getConnectedPipes(grid, visit.to)) {
        if (visited.has(neighbour)) {
            continue;
        }
        toVisit.enqueue({ from: visit.to, to: neighbour});
    }
}
// Part One
console.log(Math.max(...distances.flat()));
