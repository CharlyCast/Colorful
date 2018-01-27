import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Header from '../components/header';
import AppBody from './app-body';
import Interpreter from '../compiler/interpreter';
import {loadInterpreter} from "../actions/index";

class App extends Component {

    constructor(props) {
        super(props);

        this.props.loadInterpreter(new Interpreter());
    }

    render() {
        return (
            <div id="app" className="container-fluid">
                <header>
                    <Header/>
                </header>

                <AppBody/>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {};
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({loadInterpreter:loadInterpreter}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
