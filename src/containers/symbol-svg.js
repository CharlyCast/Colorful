import React, {Component} from 'react'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {moveCursor, removeCursor} from '../actions/index';

//Call by code-zone.js
class SymbolSVG extends Component {
    constructor(props) {
        super(props);

        this.state = {
            visitedVertex: [0, 0, 0, 0, 0, 0, 0, 0, 0]
        };
    }

    render() {
        var cursor = "";
        var paddingLeft = "2px"; //Set the same as the cursor width
        if (this.props.indent) {
            return (
                <div className="indent"
                     onClick={() => this.clicked()}
                />
            );
        }
        else if (this.props.cursor) {
            cursor = "2px solid #b3bbc9";
            paddingLeft = "0px";
        }
        this.state.visitedVertex = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        let width;
        let flex;
        switch (this.props.width) {
            case 0:
                width = "";
                break;
            case 1:
                width = "5em";
                break;
            case 2:
                width = "15em";
                break;
            default:
                width = "26em";
                break;
        }
        if (width != "") {
            width = "calc(" + width + " + 2px)";
            flex = "";
        }
        else {
            flex = "1";
        }
        return (
            <svg className="symbol"
                 style={{
                     width: width,
                     borderLeft: cursor,
                     paddingLeft: paddingLeft,
                     flex: flex
                 }}
                 onClick={() => this.clicked()}
            >
                {this.props.edges.map(
                    (edge, index) => this.drawLine(edge, index)
                )
                }
            </svg>
        );
    }

    clicked() {
        this.props.removeCursor(this.props.cursorPosition);
        this.props.moveCursor(false, [this.props.position[0], this.props.position[1]]);
    }

    drawLine(edge, index) {
        //Draw a line between the two vertices of the edge
        let line = [];
        let vertex1 = this.vertexPosition(edge[0]);
        let vertex2 = this.vertexPosition(edge[1]);
        line.push(<line x1={vertex1.x}
                        y1={vertex1.y}
                        x2={vertex2.x}
                        y2={vertex2.y}
                        stroke={this.props.color}
                        strokeWidth="3em"
                        key={index}/>);

        //Draw a circle if the edge has never been used until now
        if (this.state.visitedVertex[edge[0] - 1] == 0) {
            line.push(<circle
                cx={vertex1.x} cy={vertex1.y} r="1.5em"
                fill={this.props.color}/>
            );
            this.state.visitedVertex[edge[0] - 1] = 1;
        }
        if (this.state.visitedVertex[edge[1] - 1] == 0) {
            line.push(<circle
                cx={vertex2.x} cy={vertex2.y} r="1.5em"
                fill={this.props.color}/>
            );
            this.state.visitedVertex[edge[1] - 1] = 1;
        }

        return (line);
    }

    vertexPosition(vertexId) {
        //Return the relative position of the vertex
        switch (vertexId) {
            case 1:
                return {x: "2em", y: "2em"};
                break;
            case 2:
                return {x: "13em", y: "2em"};
                break;
            case 3:
                return {x: "24em", y: "2em"};
                break;
            case 4:
                return {x: "2em", y: "13em"};
                break;
            case 5:
                return {x: "13em", y: "13em"};
                break;
            case 6:
                return {x: "24em", y: "13em"};
                break;
            case 7:
                return {x: "2em", y: "24em"};
                break;
            case 8:
                return {x: "13em", y: "24em"};
                break;
            case 9:
                return {x: "24em", y: "24em"};
                break;
        }
        console.log("Error in connect line position, sensorId unidentified : ", vertexId);
        return {x: "2em", y: "2em"};
    }
}

function mapStateToProps(state) {
    return {
        cursorPosition: state.cursorPosition
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        moveCursor: moveCursor,
        removeCursor: removeCursor
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SymbolSVG)