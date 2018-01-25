import React, {Component} from 'react'
import {connect} from 'react-redux';
import SymbolSVG from './symbol-svg';

class CodeZone extends Component {

    render() {
        return (
            <div id="code-zone">
                {this.props.code.map((line, index) => this.drawLine(line, index))}
            </div>
        )
    }

    drawLine(line, index) {
        //We set the cursor
        // console.log("Code, cursor pos : ",this.props.cursorPosition);
        // console.log("Code : ",this.props.code);
        this.props.code[this.props.cursorPosition[0]][this.props.cursorPosition[1]].cursor = true;

        let indexLine = index;

        return (
            <div className="code-line"
                 key={index}>
                {line.map((symbolSVG, index) => {
                    return this.drawSymbol(symbolSVG, index, indexLine);
                })}
            </div>
        );
    }

    drawSymbol(symbolSVG, index, indexLine) {
        return (
            <SymbolSVG edges={symbolSVG.symbol.edges}
                       color={symbolSVG.symbol.color}
                       width={symbolSVG.width}
                       indent={symbolSVG.symbol.indent}
                       cursor={symbolSVG.cursor}
                       position={[indexLine, index]}
                       key={index}/>
        );
    }
}

function mapStateToProps(state) {
    return {
        code: state.code,
        cursorPosition: state.cursorPosition
    };
}

export default connect(mapStateToProps)(CodeZone)