import React, {Component} from 'react';
import {connect} from 'react-redux';
import Home from '../components/home';
import Doc from '../components/doc';
import DevZone from './dev-zone';
import Interpreter from './interpreter';

class AppBody extends Component {
    render(){
        switch (this.props.appBody){
            case ("Code"):
                return <DevZone/>;
            case ("Doc"):
                return <Doc/>;
            case("Interpreter"):
                return <Interpreter/>
        }
        return (
            <Home/>
        );
    }
}

function mapStateToProps(state) {
    return {
        appBody: state.appBody
    };
}

export default connect(mapStateToProps)(AppBody)