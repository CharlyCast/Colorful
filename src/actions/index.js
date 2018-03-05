export function changeAppBody(env) {
    return {
        type: 'ENVIRONNEMENT_SELECTION',
        payload: env
    };
}

export function loadInterpreter(interpreter){
    //Call reducer_interpreter.js
    return {
        type: 'LOAD_INTERPRETER',
        payload: interpreter
    }
}

export function changeColor(color) {
    // console.log("action: ", color);
    return {
        type: 'COLOR_SELECTION',
        payload: color
    };
}

export function drawing(sensor) {
    //Call reducer_drawing.js
    // console.log("action dessin n° ", sensor);
    return {
        type: 'DRAWING',
        payload: sensor
    };
}

export function erase(position, line){
    //Call reducer_code.js
    return {
        type: 'ERASE',
        payload: {
            position: position,
            line : line
        }
    };
}

export function draw(drawIt, drawing, color, position) {
    //Call reducer_code.js
    return {
        type: 'DRAW',
        payload: {
            drawIt: drawIt,
            drawing: drawing,
            color: color,
            position: position
        }
    };
}

export function newLine() {
    //Call reducer_code.js
    return {
        type: 'NEW_LINE'
    }
}

export function indent(position) {
    //Call reducer_code.js
    return {
        type: 'INDENT',
        payload: position
    };
}

export function moveCursor(increment, value) {
    //Increment is a boolean, if true we add value to the cursor position, else the new position is value.
    //Call reducer_cursor
    return {
        type: 'MOVE_CURSOR',
        payload: {
            increment: increment,
            value: value
        }
    }
}

export function removeCursor(cursorPosition){
    //Call reducer_code
    return {
        type: 'REMOVE_CURSOR',
        payload: cursorPosition
    }
}

export function getHeap(heap){
    //Return the heap with the value of the variables after the code was interpreted
    //Call reducer_heap.js
    console.log("getHeap activated !");
    return {
        type: 'RETURN_HEAP',
        payload: heap
    }
}