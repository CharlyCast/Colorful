import React, {Component} from 'react'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Terminal from './terminal';
import {getHeap} from '../actions/index'

class Interpreter extends Component{

    render (){
        return (
            <div className="interpreter">
                <Terminal/>
                <button onClick={()=>{
                    console.log("Clicked on interpret !");
                    this.props.getHeap(this.props.interpreter.interpret(this.props.code));
                }
                }>Interpret</button>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        // selectedColor: state.selectedColor
        code:state.code,
        interpreter:state.interpreter
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({getHeap:getHeap}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Interpreter)