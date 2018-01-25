import React, {Component} from 'react';
import Navigator from './navigator';

export default class Header extends Component {
    render() {
        return (
            <div id="main-header" className="row">
                <div className="main-header__upper-part">
                    <div id="logo" className="col-xs-1">
                        <img src="../../img/logo.svg" className="logo"/>
                    </div>
                    <h1 className="col-xs-3">
                        Colorful
                    </h1>
                    <nav className="navigator">
                        <Navigator name="Home" />
                        <Navigator name="Code" />
                        <Navigator name="Doc" />
                        <Navigator name="Interpreter"/>
                    </nav>
                </div>
                <div className="row">
                    <img src="../../img/separationBar.svg" className="separationBar"/>
                </div>
            </div>
        )
    }
}