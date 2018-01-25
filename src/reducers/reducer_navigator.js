export default function (state = null,action) {
    switch (action.type){
        case 'ENVIRONNEMENT_SELECTION':
            return action.payload
    }
    return state
}