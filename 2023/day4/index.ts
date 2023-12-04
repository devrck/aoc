import { readFileSync } from "fs";

const lines: string[] = readFileSync("input", "utf-8")
    .split("\n")
;

let sum = 0;
// Part one
// for (const line of lines) {
//     const [cardId, ticket] = line.split(':');
//
//     //console.log('Card = ', cardId);
//     //console.log('Ticket = ', ticket);
//
//     const [winningNumbersString, playedNumbersString] = ticket.split('|');
//
//
//     const winningNumbers = (winningNumbersString.match(/\d+/g)?.map(v => parseInt(v, 10)) || []).sort();
//     const playedNumbers = new Set((playedNumbersString.match(/\d+/g)?.map(v => parseInt(v, 10)) || []).sort());
//     const successfullyPredicted = Array.from(playedNumbers.values()).filter(n => winningNumbers.includes(n));
//     const value = successfullyPredicted.length >= 1 ? (Math.pow(2, (successfullyPredicted.length - 1))) : 0;
//     console.log(cardId, ' managed to predict ', successfullyPredicted, ' value ', value);
//
//     sum += value;
// }

// Part two
/*

card 1 = 4
card 2 = 2
card 3 = 2
card 4 = 1
card 5 = 0
card 6 = 0

---
total cards = 30

card 1 - 4 matches
card 2, card 2-1 (card 1),
card 3, card 3-1 (card 1), card 3-2 (card 2), card 3-3 (card 2-1),
card 4, card 4-1 (card 1), card 4-2 (card 2), card 4-3 (card 2-1), card 4-3 (card 3), card 4-3-1 (card 3-1), card 4-3-2 (card 3-2), card 4-3-3 (card 3-3)
card 5, card 5-1 (card 1), card 5-3 (card 3), card 5-3-1 (card 3-1), card 5-3-2 (card 3-2), card 5-3-3 (card 3-3), card 5-4 (card 4), card 5-4-1 (card 4),...
card 6,
 */
const cards: {
    [key: string]: string[]
} = {};

for (const line of lines) {
    const [cardIdS, ticket] = line.split(':');
    const cardId: number = parseInt(cardIdS.replace(/.*\s(\d+)/, '$1'), 10);
    const [winningNumbersString, playedNumbersString] = ticket.split('|');

    const winningNumbers = (winningNumbersString.match(/\d+/g)?.map(v => parseInt(v, 10)) || []).sort();
    const playedNumbers = new Set((playedNumbersString.match(/\d+/g)?.map(v => parseInt(v, 10)) || []).sort());
    const successfullyPredicted = Array.from(playedNumbers.values()).filter(n => winningNumbers.includes(n));
    const value = successfullyPredicted.length;
    console.log(cardIdS, ' managed to predict ', successfullyPredicted, ' value ', value);
    if (!cards.hasOwnProperty(cardId + "")) {
        cards[cardId + ""] = [cardId + ""];
    } else {
        cards[cardId + ""].push(cardId + "");
    }
    for (const card of cards[cardId+""]) {
        let i = 1;
        while (i <= value) {
            if (!cards.hasOwnProperty((cardId + i) + "")) {
                cards[(cardId + i) + ""] = [];
            }
            cards[(cardId + i) + ""].push(`${cardId + i}-${card}`);
            ++i;
        }
    }
}
let i = 0;
const maxLines = lines.length;
for (const permutations of Object.values(cards)) {
    if (i > maxLines) {
        break;
    }
    ++i;
    sum += permutations.length;
}

console.log(sum);