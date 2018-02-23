import Value from './value';
import Type from './types';

//The alphabet sorted by type
//Each element's edges should be sorted (with the order decided by the first point, and the second in case of ties)
export default [
    {
        edges: [[1, 2], [1, 4], [2, 5], [4, 7], [5, 8], [7, 8]],
        romaji: "0",
        type: Type.number,
        value: 0
    }, {
        edges: [[2, 4], [2, 5], [5, 8]],
        romaji: "1",
        type: Type.number,
        value: 1
    }, {
        edges: [[1, 2], [2, 5], [4, 5], [4, 7], [7, 8]],
        romaji: "2",
        type: Type.number,
        value: 2
    }, {
        edges: [[1, 2], [2, 5], [4, 5], [5, 8], [7, 8]],
        romaji: "3",
        type: Type.number,
        value: 3
    }, {
        edges: [[1, 4], [2, 5], [4, 5], [5, 8]],
        romaji: "4",
        type: Type.number,
        value: 4
    }, {
        edges: [[1, 2], [1, 4], [4, 5], [5, 8], [7, 8]],
        romaji: "5",
        type: Type.number,
        value: 5
    }, {
        edges: [[1, 2], [1, 4], [4, 5], [4, 7], [5, 8], [7, 8]],
        romaji: "6",
        type: Type.number,
        value: 6
    }, {
        edges: [[1, 2], [2, 7]],
        romaji: "7",
        type: Type.number,
        value: 7
    }, {
        edges: [[1, 2], [1, 4], [2, 5], [4, 5], [4, 7], [5, 8], [7, 8]],
        romaji: "8",
        type: Type.number,
        value: 8
    }, {
        edges: [[1, 2], [1, 4], [2, 5], [4, 5], [5, 8], [7, 8]],
        romaji: "9",
        type: Type.number,
        value: 9
    }, {
        edges: [[1, 2], [2, 3], [2, 5], [5, 8]],
        romaji: "True",
        type: Type.boolean,
        value: true
    }, {
        edges: [[1, 2], [1, 4], [4, 5], [4, 7]],
        romaji: "False",
        type: Type.boolean,
        value: false
    }, {
        edges: [[2, 7], [2, 9], [7, 8], [8, 9]],
        romaji: "var",
        type: Type.id
    }, {
        edges: [[2, 5], [4, 5], [5, 6], [5, 8]],
        romaji: "+",
        type: Type.operator,
        value: Value.add,
        priority: 10,
        associativity: Value.left
    }, {
        edges: [[4, 5]],
        romaji: "-",
        type: Type.operator,
        value: Value.sub,
        priority: 10,
        associativity: Value.left
    }, {
        edges: [[1, 5], [3, 5], [5, 7], [5, 9]],
        romaji: "*",
        type: Type.operator,
        value: Value.mult,
        priority: 11,
        associativity: Value.left
    }, {
        edges: [[2, 7]],
        romaji: "/",
        type: Type.operator,
        value: Value.div,
        priority: 11,
        associativity: Value.left
    }, {
        edges: [[1, 2], [2, 7], [7, 8]],
        romaji: "%",
        type: Type.operator,
        priority: 11,
        associativity: Value.left
    }, {
        edges: [[5, 7], [5, 9]],
        romaji: "and",
        type: Type.operator,
        value: Value.and,
        priority: 7,
        associativity: Value.left
    }, {
        edges: [[4, 8], [6, 8]],
        romaji: "or",
        type: Type.operator,
        value: Value.or,
        priority: 6,
        associativity: Value.left
    }, {
        edges: [[1, 2], [4, 5]],
        romaji: "=",
        type: Type.operator,
        value: Value.equal,
        priority: 5,
        associativity: Value.right
    }, {
        edges: [[1, 6], [4, 5], [5, 6]],
        romaji: ">",
        type: Type.operator,
        value: Value.greater,
        priority: 9,
        associativity: Value.left
    }, {
        edges: [[3, 4], [4, 5], [5, 6]],
        romaji: "<",
        type: Type.operator,
        value: Value.less,
        priority: 9,
        associativity: Value.left
    }, {
        edges: [[2, 4], [4, 5], [4, 8], [5, 6]],
        romaji: "<-",
        type: Type.affectation
    }, {
        edges: [[1, 2], [1, 4], [4, 7], [7, 8]],
        romaji: "(",
        type: Type.delimiter,
        value: Value.leftParenthesis
    }, {
        edges: [[1, 2], [2, 5], [5, 8], [7, 8]],
        romaji: ")",
        type: Type.delimiter,
        value: Value.rightParenthesis
    }, {
        edges: [[1, 3], [2, 3], [2, 5], [3, 5], [4, 7], [6, 9], [7, 8], [8, 9]],
        romaji: "while",
        type: Type.loop,
        value: Value.while
    }
];