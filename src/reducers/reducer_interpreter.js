export default function (state = null,action) {
    switch (action.type){
        case 'LOAD_INTERPRETER':
            return action.payload
    }
    return state
}