export default function (state = [0,0],action) {
    switch (action.type){
        case 'MOVE_CURSOR':
            if (action.payload.increment){
                state[1]+=action.payload.value;
                state.slice()
            }
            else {
                state=action.payload.value;
            }
            return state
    }
    return state
}