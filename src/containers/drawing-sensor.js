import React, {Component} from 'react'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {drawing} from "../actions/index";

class DrawingSensor extends Component {
    render() {
        var radius;
        if (this.isActivated()) {
            radius = "1.5vw";
        } else {
            radius = "1vw";
        }
        return (
            <svg className="drawing-sensor"
                 onMouseOver={() => this.props.drawing(this.props.sensor)}
                 onTouchStart={() => this.props.drawing(this.props.sensor)}>
                <circle
                    cx="2vw" cy="2vw" r={radius}
                    fill={this.props.selectedColor}/>
            </svg>
        )
    }

    isActivated() {
        // if (this.props.sensor == 1) console.log(this.props.activatedSensor);
        for (let i = 0, c = this.props.activatedSensor.length; i < c; i++) {
            if (this.props.activatedSensor[i][0] == this.props.sensor) {
                return true;
            }
            else if (this.props.activatedSensor[i].length>1 && this.props.activatedSensor[i][1]== this.props.sensor){
                return true;
            }
        }
        return false;
    }
}

function mapStateToProps(state) {
    return {
        selectedColor: state.selectedColor,
        activatedSensor: state.activatedSensors
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({drawing: drawing}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DrawingSensor)
