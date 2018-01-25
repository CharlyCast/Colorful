import Symbol from '../compiler/symbol';

export default function (state = [[{
    width: 0,
    cursor: false,
    symbol: new Symbol([], "#2a313d")
}]], action) {

    switch (action.type) {
        case 'DRAW':
            if (action.payload.drawIt) {//We want to draw it

                //If the last element is a vertex and not an edge
                if (action.payload.drawing[action.payload.drawing.length - 1].length === 1) { //Created an error : cannot read length of undefined
                    action.payload.drawing.pop();
                }
                let justified = justify(action.payload.drawing);
                let s = new Symbol(justified.edges, action.payload.color);
                s.sortVertex();
                s.sortEdges();
                state[action.payload.position[0]].splice(action.payload.position[1], 0, {
                    width: justified.width,
                    cursor: false,
                    symbol: s
                });
                console.log("Coding : ", state);
            }
            return state.slice();
            break;

        case 'NEW_LINE':
            state.push([]);
            state[state.length - 1].push({
                width: 0,
                cursor: false,
                symbol: new Symbol([], "#2a313d")
            });
            return state.slice();
            break;

        case 'INDENT':
            state[action.payload[0]].splice(action.payload[1], 0, {
                symbol: new Symbol([], "#2a313d", true)
            });
            return state.slice();
            break;

        case 'REMOVE_CURSOR':
            state[action.payload[0]][action.payload[1]].cursor = false;
            return state;
            break;
        case 'ERASE':
            if (!action.payload.line && action.payload.position[1] < state[action.payload.position[0]].length - 1) {
                console.log("Erased");
                state[action.payload.position[0]].splice(action.payload.position[1], 1);
            }
            else if (action.payload.line) {
                //We remove a line break
                state[action.payload.position[0]].splice(action.payload.position[1], 1);
                state[action.payload.position[0] + 1].map((symbol) => {
                    state[action.payload.position[0]].push(symbol);
                });
                state.splice(action.payload.position[0] + 1, 1);
            }
            return state.slice();
            break;

    }
    return state
}

function justify(edges) {
    let right = false, middle = false, left = false;

    for (let i = 0; i < edges.length; i++) {
        for (let j = 0; j < 2; j++) {
            switch (edges[i][j]) {
                case 1:
                case 4:
                case 7:
                    right = true;
                    break;
                case 2:
                case 5:
                case 8:
                    middle = true;
                    break;
                case 3:
                case 6:
                case 9:
                    left = true;
                    break;
            }
        }
    }

    let shift = 0;
    if (!right) {
        if (!middle) {
            shift = -2;
        }
        else {
            shift = -1;
        }
    }

    for (let i = 0; i < edges.length; i++) {
        for (let j = 0; j < 2; j++) {
            edges[i][j] += shift;
        }
    }

    let width = 0;
    if (right) {
        width += 1;
    }
    if (middle) {
        width += 1;
    }
    if (left) {
        width += 1;
    }
    return {
        edges: edges,
        width: width
    }
}