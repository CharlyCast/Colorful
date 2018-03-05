import React, {Component} from 'react'
import {connect} from 'react-redux';


class Terminal extends Component {

    render() {
        return (
            <div className="terminal">
                {this.printVariables()}
            </div>
        )
    }

    printVariables() {
        if (this.props.heap===null){
            return <p>No output yet</p>
        }
        else {
            console.log(this.props.heap);
            return Object.keys(this.props.heap).map((color) => {
                return <p key={color} style={{color:color, fontSize:"x-large"}}>
                    {this.props.heap[color]}
                </p>
            });
        }
    }
}

function mapStateToProps(state) {
    return {heap: state.heap};
}

export default connect(mapStateToProps)(Terminal)