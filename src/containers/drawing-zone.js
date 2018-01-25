import React, {Component} from 'react'
import {connect} from 'react-redux';
import DrawingSensorPannel from './drawing-sensor-pannel';
import SendDrawing from './send-drawing';

class DrawingZone extends Component {
    render() {
        return (
            <div id="drawing-zone">
                <DrawingSensorPannel/>
                <SendDrawing/>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        // selectedColor: state.selectedColor
        // code:state.code,
        // interpreter:state.interpreter
    };
}

export default connect(mapStateToProps)(DrawingZone)