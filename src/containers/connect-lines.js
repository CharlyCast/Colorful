import React, {Component} from 'react';
import {connect} from 'react-redux';


class ConnectLines extends Component {
    render() {
        return (
            <svg className="connect-lines">
                <line x1={this.props.start.x}
                      y1={this.props.start.y}
                      x2={this.props.end.x}
                      y2={this.props.end.y}
                      stroke={this.props.selectedColor}
                      strokeWidth="3vw"/>
            </svg>
        );
    }
}

function mapStateToProps(state) {
    return {
        selectedColor: state.selectedColor,
    };
}

export default connect(mapStateToProps)(ConnectLines)
