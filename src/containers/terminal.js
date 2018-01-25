import React, {Component} from 'react'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';


class Terminal extends Component{

    render (){
        return (
            <div className="terminal">
                Terminal
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {};
}

// function mapDispatchToProps(dispatch) {
//     return bindActionCreators({}, dispatch);
// }

export default connect(mapStateToProps)(Terminal)