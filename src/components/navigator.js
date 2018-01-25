import React, {Component} from 'react'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {changeAppBody} from "../actions/index";

class Navigator extends Component {
    constructor(props) {
        var color;
        super(props);

        switch (this.props.name) {
            case 'Home':
                color="#6600ff";
                break;
            case 'Code':
                color="#0099ff";
                break;
            case 'Doc':
                color="#00ff00";
                break;
            case 'Interpreter':
                color="#ff0000";
                break;
            default :
                color="";
                break;
        }

        this.state = {
            name: 'Test',
            color: color
        };
    }

    render() {
        return (
            <h3
                className="navigator__button"
                style={{
                    color:this.state.color,
                    borderColor:this.state.color
                }}
                onClick={() => this.props.changeAppBody(this.props.name)}>
                {this.props.name}
            </h3>
        )
    }
}

function mapStateToProps(state) {
    return {};
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({changeAppBody: changeAppBody}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Navigator)