import readline from 'readline';
import fs from 'fs';

const input = readline.createInterface({
    input: fs.createReadStream('input')
});

const numbers: {[key: string]: string;} = {
    'twone': '21',
    'eightwo': '82',
    'eighthree': '83',
    'threeight': '38',
    'fiveight': '58',
    'sevenine': '79',
    'nineight': '98',
    'oneight': '18',
    'one': '1',
    'two': '2',
    'three': '3',
    'four': '4',
    'five': '5',
    'six': '6',
    'seven': '7',
    'eight': '8',
    'nine': '9',
}
const regx = new RegExp(Object.keys(numbers).join('|'), 'gm');
const isCharNumber = (c: string) => !isNaN(parseInt(c, 10));
let sum = 0;
input.on('line', (line: string) => {
    let first: number | null = null, second: number | null = null;
    console.debug("line = ", line);
    line = line.trim().replace(regx,function (match: string): string {
        return String(numbers[match]);
    });
    console.debug("line = ", line);
    let i = 0, j = line.length - 1;
    while (i <= j) {
        if (!first && isCharNumber(line[i])) {
            first = +line[i];
            console.debug("first = ", line[i]);
        }
        if (!second && isCharNumber(line[j])) {
            second = +line[j];
            console.debug("second = ", line[j]);
        }
        if (first && second) {
            break;
        }

        !first && ++i;
        !second && --j;
    }

    first = first || second;
    second = second || first;

    sum += (+`${first}${second}`);
    console.debug(sum);
});