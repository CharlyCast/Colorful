import {combineReducers} from 'redux';
import NavigatorReducer from "./reducer_navigator";
import InterpreterReducer from "./reducer_interpreter";
import ColorReducer from './reducer_color';
import ColorSelectionReducer from './reducer_color_selection'
import ActivatedSensors from  './reducer_drawing';
import DrawCode from './reducer_code';
import MoveCursor from './reducer_cursor';

const rootReducer = combineReducers({
    appBody: NavigatorReducer,
    interpreter: InterpreterReducer,
    selectedColor: ColorSelectionReducer,
    colors: ColorReducer,
    activatedSensors: ActivatedSensors,
    code: DrawCode,
    cursorPosition: MoveCursor
});

export default rootReducer;
