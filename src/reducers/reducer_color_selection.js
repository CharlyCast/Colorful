export default function (state = "#ffffff",action) {
    switch (action.type){
        case 'COLOR_SELECTION':
            return action.payload
    }
    return state
}