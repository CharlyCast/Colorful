import React, {Component} from 'react'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {draw, erase, newLine, indent, moveCursor, removeCursor} from '../actions/index';

class SendDrawing extends Component {
    render() {
        return (
            <div className="send">
                {/*ERASE*/}
                <div className="send-drawing"
                     style={{
                         color: this.props.selectedColor,
                         borderColor: this.props.selectedColor
                     }}
                     onClick={() => {
                         if (this.props.activatedSensor.length == 0) {
                             if (this.props.cursorPosition[1] > 0) {
                                 //We erase a symbol in the middle of a line
                                 this.props.removeCursor(this.props.cursorPosition, true);
                                 this.props.moveCursor(true, -1);
                                 this.props.erase(this.props.cursorPosition,false);
                             }
                             else if (this.props.cursorPosition[0] > 0) {
                                 //We erase the first symbol of the line
                                 this.props.removeCursor(this.props.cursorPosition, true);
                                 this.props.moveCursor(false, [this.props.cursorPosition[0]-1,this.props.code[this.props.cursorPosition[0]-1].length-1]);
                                 // console.log("Cursor should be at : ", [this.props.cursorPosition[0]-1,this.props.code[this.props.cursorPosition[0]-1].length-1]);
                                 // console.log("Erase line, cursor pos : ", this.props.cursorPosition);
                                 this.props.erase([this.props.cursorPosition[0]-1,this.props.code[this.props.cursorPosition[0]-1].length-1],true);
                             }
                         }
                         else {
                             this.props.draw(false, [], '');
                         }
                     }}>
                    Erase
                </div>
                {/*DRAW*/}
                <div className="send-drawing"
                     style={{
                         color: this.props.selectedColor,
                         borderColor: this.props.selectedColor
                     }}
                     onClick={() => {
                         this.props.draw(true, this.props.activatedSensor, this.props.selectedColor, this.props.cursorPosition);
                         this.props.removeCursor(this.props.cursorPosition);
                         this.props.moveCursor(true, 1);
                     }}>
                    Draw
                </div>
                {/*Indent*/}
                <div className="send-drawing"
                     style={{
                         color: this.props.selectedColor,
                         borderColor: this.props.selectedColor
                     }}
                     onClick={() => {
                         this.props.indent(this.props.cursorPosition);
                         this.props.removeCursor(this.props.cursorPosition);
                         this.props.moveCursor(true, 1);
                     }}>
                    Indent
                </div>
                {/*NEW LINE*/}
                <div className="send-drawing"
                     style={{
                         color: this.props.selectedColor,
                         borderColor: this.props.selectedColor
                     }}
                     onClick={() => {
                         this.props.newLine();
                         this.props.removeCursor(this.props.cursorPosition);
                         this.props.moveCursor(false, [this.props.cursorPosition[0] + 1, 0]);
                     }}>
                    {/*Arrow*/}
                    &crarr;
                </div>

            </div>

        );
    }
}


function mapStateToProps(state) {
    return {
        selectedColor: state.selectedColor,
        activatedSensor: state.activatedSensors,
        cursorPosition: state.cursorPosition,
        code: state.code
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        draw: draw,
        erase: erase,
        newLine: newLine,
        indent: indent,
        moveCursor: moveCursor,
        removeCursor: removeCursor
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SendDrawing)