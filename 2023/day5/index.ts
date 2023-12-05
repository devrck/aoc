import { readFileSync } from "fs";

const lines: string[] = readFileSync("input", "utf-8")
    .split("\n")
;
let min = Number.POSITIVE_INFINITY;

interface MapStructure {
    'destinationRangeStart': number,
    'sourceRangeStart': number,
    'rangeLength': number,
}

const seeds: number[] = lines[0].split(':')[1].match(/\d+/g)?.map(v => parseInt(v, 10)) || [];

const maps: {
    [key: string]: MapStructure[]
} = {
    'seed-to-soil': [],
    'soil-to-fertilizer': [],
    'fertilizer-to-water': [],
    'water-to-light': [],
    'light-to-temperature': [],
    'temperature-to-humidity': [],
    'humidity-to-location': [],
};

let i = 3;
for (const key of Object.keys(maps)) {
    while (lines[i]?.trim()) {
        const [
            destinationRangeStart,
            sourceRangeStart,
            rangeLength
        ] = lines[i].match(/\d+/g)?.map(v => parseInt(v, 10)) || [];
        maps[key].push({
            destinationRangeStart,
            sourceRangeStart,
            rangeLength
        })
        ++i;
    }
    i+=2;
}

// Part one
for (const seed of seeds) {
    //console.log('Seed ', seed);
    let convertedNumber = seed;
    for (const [key, value] of Object.entries(maps)) {
        //console.log('Converting ', key, ' before ', convertedNumber)
        for (const map of Object.values(value)) {
            if (map.sourceRangeStart <= convertedNumber && convertedNumber <= (map.sourceRangeStart + map.rangeLength - 1)) {
                convertedNumber = convertedNumber - map.sourceRangeStart + map.destinationRangeStart;
                break;
            }
        }
        //console.log('After ', key, ' ', convertedNumber);
    }
    min = Math.min(min, convertedNumber)
}

//Part two




console.log(min);