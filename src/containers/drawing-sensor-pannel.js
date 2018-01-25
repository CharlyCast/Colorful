import React, {Component} from 'react'
import {connect} from 'react-redux';
import DrawingSensor from './drawing-sensor'
import ConnectLines from './connect-lines';

class DrawingSensorPannel extends Component {
    render() {
        return (
            <div className="sensor-pannel"
                 onMouseMove={() => console.log("ça bouge")}>
                {this.drawConnectLine()}
                <div className="sensor-row">
                    <DrawingSensor sensor={1}/>
                    <DrawingSensor sensor={2}/>
                    <DrawingSensor sensor={3}/>
                </div>
                <div className={"sensor-row"}>
                    <DrawingSensor sensor={4}/>
                    <DrawingSensor sensor={5}/>
                    <DrawingSensor sensor={6}/>
                </div>
                <div className={"sensor-row"}>
                    <DrawingSensor sensor={7}/>
                    <DrawingSensor sensor={8}/>
                    <DrawingSensor sensor={9}/>
                </div>
            </div>
        )
    }

    drawConnectLine() {
        var lines = [];

        for (var i = 0, c = this.props.activatedSensor.length; i < c; i++) {
            if (this.props.activatedSensor[i].length==2){
                lines.push(<ConnectLines start={this.sensorPosition(this.props.activatedSensor[i][0])}
                                         end={this.sensorPosition(this.props.activatedSensor[i][1])}
                                         key={i}
                />);
            }
        }
        return lines;
    }

    sensorPosition(sensorId) {
        //Everything here depend of the dimensions on the drawing panel and sensor, see style.css.
        switch (sensorId) {
            case 1:
                return {x: "2vw", y: "2vw"};
                break;
            case 2:
                return {x: "13vw", y: "2vw"};
                break;
            case 3:
                return {x: "24vw", y: "2vw"};
                break;
            case 4:
                return {x: "2vw", y: "13vw"};
                break;
            case 5:
                return {x: "13vw", y: "13vw"};
                break;
            case 6:
                return {x: "24vw", y: "13vw"};
                break;
            case 7:
                return {x: "2vw", y: "24vw"};
                break;
            case 8:
                return {x: "13vw", y: "24vw"};
                break;
            case 9:
                return {x: "24vw", y: "24vw"};
                break;
        }
        console.log("Error in connect line position, sensorId unidentified : ", sensorId);
        return {x: "2vw", y: "2vw"};
    }
}

function mapStateToProps(state) {
    return {
        activatedSensor: state.activatedSensors
    };
}

export default connect(mapStateToProps)(DrawingSensorPannel)