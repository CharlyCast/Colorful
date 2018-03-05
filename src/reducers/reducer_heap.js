export default function (state = {},action) {
    console.log("heap dispatched");
    switch (action.type){
        case 'RETURN_HEAP':
            console.log("Received new heap");
            return Object.assign({},action.payload);
    }
    return state
}