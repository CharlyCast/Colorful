const Type = {
    number: 1,
    boolean: 2,
    var: 3,
    operator: 4
};

//The alphabet sorted by type
const alphabet = [
    {
        edges: [[1, 2], [1, 4], [2, 5], [4, 5], [4, 7], [5, 8], [7, 8]],
        romaji: "0",
        type: Type.number
    }, {
        edges: [[2, 4], [2, 5], [5, 8]],
        romaji: "1",
        type: Type.number
    }, {
        edges: [[1, 2], [2, 5], [4, 5], [4, 7], [7, 8]],
        romaji: "2",
        type: Type.number
    }, {
        edges: [[1, 2], [2, 5], [4, 5], [5, 8], [7, 8]],
        romaji: "3",
        type: Type.number
    }, {
        edges: [[1, 4], [2, 5], [4, 5], [5, 8]],
        romaji: "4",
        type: Type.number
    }, {
        edges: [[1, 2], [1, 4], [4, 5], [5, 8], [7, 8]],
        romaji: "5",
        type: Type.number
    }, {
        edges: [[1, 2], [1, 4], [4, 5], [4, 7], [5, 8], [7, 8]],
        romaji: "6",
        type: Type.number
    }, {
        edges: [[1, 2], [2, 7]],
        romaji: "7",
        type: Type.number
    }, {
        edges: [[1, 2], [1, 4], [2, 5], [4, 5], [4, 7], [5, 8], [7, 8]],
        romaji: "8",
        type: Type.number
    }, {
        edges: [[1, 2], [1, 4], [2, 5], [4, 5], [5, 8], [7, 8]],
        romaji: "9",
        type: Type.number
    }, {
        edges: [[1, 2], [2, 3], [2, 5], [5, 8]],
        romaji: "True",
        type: Type.boolean
    }, {
        edges: [[1, 2], [1, 4], [4, 5], [4, 7]],
        romaji: "False",
        type: Type.boolean
    }, {
        edges: [[2, 7], [2, 9], [7, 8], [8, 9]],
        romaji: "var",
        type: Type.var
    }, {
        edges: [[2, 5], [4, 5], [5, 6], [5, 8]],
        romaji: "+",
        type: Type.operator
    }, {
        edges: [[4, 5]],
        romaji: "-",
        type: Type.operator
    }, {
        edges: [[1, 5], [3, 5], [5, 7], [5, 9]],
        romaji: "*",
        type: Type.operator
    }, {
        edges: [[2, 7]],
        romaji: "/",
        type: Type.operator
    }, {
        edges: [[1, 2], [2, 7], [7, 8]],
        romaji: "%",
        type: Type.operator
    }, {
        edges: [[5, 7], [5, 9]],
        romaji: "and",
        type: Type.operator
    }, {
        edges: [[4, 8], [6, 8]],
        romaji: "or",
        type: Type.operator
    }, {
        edges: [[1, 2], [4, 5]],
        romaji: "=",
        type: Type.operator
    }, {
        edges: [[1, 6], [4, 5], [5, 6]],
        romaji: ">",
        type: Type.operator
    },{
        edges: [[3, 4], [4, 5], [5, 6]],
        romaji: "<",
        type: Type.operator
    }
];

export default class tokenizer {

    constructor() {
        this.alphabet = alphabet.sort((a, b) => compareAlphabet(a, b));
        console.log("Alphabet : ", this.alphabet);
    }

    //Return the element of the alphabet that correspond to the symbol s
    //Implement a binary search
    classify(s) {
        // console.log("Classifying : ", s);

        let minIndex = 0;
        let maxIndex = this.alphabet.length - 1;
        let currentIndex;
        let currentElement;

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
                console.log("Element : ", currentElement);
                return currentElement;
            }
        }
        // console.log("Nothing found");
        return false;
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
