import { readFileSync } from "fs";

interface Hand {
    cards: string,
    bid: number,
    split: string[],
    type: number,
    rank: number,
}

const handJokers = (cards: string[]): string[] => {
    let hand = cards.sort().join("");
    const numJokers = (hand.match(/J/g) || []).length;
    if (numJokers === 0) {
        return cards;
    }
    const handWithoutJokers = hand.replace(/J/g, '').split("") || [];
    if (handWithoutJokers.length === 1) {
        handWithoutJokers.push(...Array<string>(numJokers).fill(handWithoutJokers[0]));

        return handWithoutJokers;
    }

    const mostCommonCard: string[] = handWithoutJokers.sort((a,b) =>
        handWithoutJokers.filter(v => v===b).length
        - handWithoutJokers.filter(v => v===a).length
    );

    // console.log({
    //     numJokers,
    //     mostCommonCard,
    //     handWithoutJokers
    // })

   handWithoutJokers.push(...Array<string>(numJokers).fill(mostCommonCard[0]));

    return handWithoutJokers;
}

const determineType = (cardsIndividual: string[]): number => {
    let hand = cardsIndividual.sort().join("");
    // console.log(hand);

    if (hand[0] === hand[1] && hand[1] === hand[2] && hand[2] === hand[3] && hand[3] === hand[4]) {
        return 7; // Five of a kind
    }

    // xxxxy || yxxxx
    if (
        (hand[0] === hand[1] && hand[1] === hand[2] && hand[2] === hand[3]) ||
        (hand[1] === hand[2] && hand[2] === hand[3] && hand[3] === hand[4])
    ) {
        return 6; // Four of a kind
    }

    // xxxyy || yyxxx
    if (
        (hand[0] === hand[1] && hand[1] === hand[2] && hand[3] === hand[4]) ||
        (hand[0] === hand[1] && hand[2] === hand[3] && hand[3] === hand[4])
    ) {
        return 5; // Full house
    }

    // xxxab || axxxb || abxxx
    if (
        (hand[0] === hand[1] && hand[1] === hand[2]) ||
        (hand[1] === hand[2] && hand[2] === hand[3]) ||
        (hand[2] === hand[3] && hand[3] === hand[4])
    ) {
        return 4; // Three of a kind
    }

    // xxyyz || zxxyy || xxzyy || yyxxz
    if (
        (hand[0] === hand[1] && hand[2] === hand[3]) ||
        (hand[1] === hand[2] && hand[3] === hand[4]) ||
        (hand[0] === hand[1] && hand[3] === hand[4])
    ) {
        return 3; // Two pair
    }

    // xxabc || axxbc || abxxc || abcxx
    if (
        (hand[0] === hand[1]) ||
        (hand[1] === hand[2]) ||
        (hand[2] === hand[3]) ||
        (hand[3] === hand[4])
    ) {
        return 2; // One pair
    }

    return 1;
}

const getValueOfCard = (card: string) => {
    switch(card) {
        case 'A': return 14;
        case 'K': return 13;
        case 'Q': return 12;
        case 'J': return 1;
        case 'T': return 10;
        default: return parseInt(card, 10);
    }
}

const hands: Hand[] = readFileSync("input", "utf-8")
    .split("\n")
    .map(l => {
        const [cards, bid] = l.split(' ');
        const split = cards.split("");
        // Part Two
        return {
            cards,
            split,
            type: determineType(handJokers(split)),
            bid: parseInt(bid, 10),
            rank: 1,
        }
        // Part One
        // return {
        //     cards,
        //     split,
        //     type: determineType(split),
        //     bid: parseInt(bid, 10),
        //     rank: 1,
        // }
    })
    .sort((a, b) => {
        if (a.type > b.type) {
            return 1;
        } else if (a.type < b.type) {
            return -1;
        }

        for (let j = 0; j < 5; j++) {
            if (getValueOfCard(a.cards[j]) === getValueOfCard(b.cards[j])) {
                continue;
            }

            if (getValueOfCard(a.cards[j]) > getValueOfCard(b.cards[j])) {
                return 1;
            } else if (getValueOfCard(a.cards[j]) < getValueOfCard(b.cards[j])) {
                return -1;
            }
        }

        return 0;
    })
;
let rank = 1;
let sum = 0;
hands.map(h => {
    h.rank = rank++;
    sum += (h.bid * h.rank);
});

//console.log(hands);
console.log(sum);
// const testingWith = 'AJJJJ';
// console.log({
//     'cards': testingWith,
//     'value': determineType(handJokers(testingWith.split("")))
// });