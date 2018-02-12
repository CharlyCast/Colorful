import Type from './types';
import alphabet from './alphabet'

export default class Lexer {

    constructor() {
        //The alphabet should be sorted by symbol in order to proceed to binary search
        this.alphabet = alphabet.sort((a, b) => compareAlphabet(a, b));
        console.log("Alphabet : ", this.alphabet);
    }

    //Return the element of the alphabet that correspond to the symbol s
    //Implement a binary search

    classify(s) {
        // console.log("Classifying : ", s);

        // Endline and Indent symbol
        if (s.edges.length === 0) {
            if (s.indent === true) {
                return {
                    romaji: 'indent',
                    type: Type.indent,
                    color: "#ffffff"
                }
            }
            else {
                return {
                    romaji: "end line",
                    type: Type.endLine,
                    color: "#ffffff"
                }
            }

        }

        let minIndex = 0;
        let maxIndex = this.alphabet.length - 1;
        let currentIndex;
        let currentElement;

        //Binary search to quickly find the right token
        while (minIndex <= maxIndex) {
            currentIndex = (minIndex + maxIndex) / 2 | 0;
            currentElement = this.alphabet[currentIndex];

            // console.log("Current index : ", currentIndex);

            if (s.compareTo(currentElement) > 0) {
                minIndex = currentIndex + 1;
            }
            else if (s.compareTo(currentElement) < 0) {
                maxIndex = currentIndex - 1;
            }
            else {
                // console.log("Element : ", currentElement);
                return currentElement;
            }
        }
        // console.log("Nothing found");
        return false;
    }

    tokenize(code) {
        let tokens = [];
        code.map((line) => {
            line.map((element) => {
                //Creating a deep copy of the alphabet's object
                let s = Object.assign({}, this.classify(element.symbol));
                if (s === false) {
                    console.log("Error : unrecognized symbol");
                }
                else {
                    delete s.edges;
                    s.color = element.symbol.color;
                    tokens.push(s);
                }
            })
        });

        return tokens;
    }
}

//Compare two letters of the alphabet
function compareAlphabet(a, b) {
    let v;
    for (let i = 0; i < Math.min(a.edges.length, b.edges.length); i++) {
        v = 10 * (a.edges[i][0] - b.edges[i][0]) + a.edges[i][1] - b.edges[i][1];
        if (v < 0) {
            return -1;
        }
        else if (v > 0) {
            return 1;
        }
    }
    if (a.edges.length < b.edges.length) {
        return -1;
    }
    else if (a.edges.length > b.edges.length) {
        return 1;
    }
    return 0;
}
