import React, {Component} from 'react'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {changeColor} from "../actions/index";

class ColorPicker extends Component {
    render() {
        return (
            <div className="color-picker"
                 style={{backgroundColor: this.props.color}}
                 onClick={() => this.props.changeColor(this.props.color)}>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {};
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({changeColor: changeColor}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ColorPicker)