import React, {Component} from 'react'
import {connect} from 'react-redux';
import Terminal from './terminal';

class Interpreter extends Component{

    render (){
        return (
            <div className="interpreter">
                <Terminal/>
                <button onClick={()=>this.props.code[0].map((element)=>{
                    this.props.interpreter.classify(element.symbol);
                })}>compile</button>
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

export default connect(mapStateToProps)(Interpreter)