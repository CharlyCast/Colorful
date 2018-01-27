export default function (state = [], action) {
    switch (action.type) {
        case 'DRAWING':
            // console.log("Begin drawing : ",state);
            if (state.length == 0) {
                state.push([action.payload]);
                state = state.slice();
            }
            //If there is not too many edges and the sensor detected is not the same as the last one
            else if (state.length < 128 && state.length > 0 && action.payload != state[state.length - 1][state[state.length - 1].length - 1]) {
                if (state[state.length - 1].length == 1) {
                    if (!alredyUsedEdge(state, [state[state.length - 1][0], action.payload])) {
                        state[state.length - 1].push(action.payload);
                    }
                    else {
                        state[state.length - 1][0] = action.payload;
                    }
                }
                else {
                    if (!alredyUsedEdge(state, [state[state.length - 1][1], action.payload])) {
                        state.push([state[state.length - 1][1], action.payload]);
                    }
                    else {
                        state.push([action.payload]);
                    }
                }
                state = state.slice();
            }
            return state;
            break;

        case 'DRAW':
            state = [];
            return state;
            break;
    }
    return state
}

function alredyUsedEdge(symbol, edge) {
    var bool = false;

    symbol.map((e) => {
        if (e[0] == edge[0] && e[1] == edge[1]) {
            bool = true;
        }
        else if (e[1] == edge[0] && e[0] == edge[1]) {
            bool = true;
        }
    });
    return bool;
}