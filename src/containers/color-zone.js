import React, {Component} from 'react'
import ColorPicker from './color-picker';
import {connect} from 'react-redux';

class ColorZone extends Component {
    render() {
        return (
            <div id="color-zone">
                {/*<div className="col-xs-3" id="color-zone">*/}
                {this.renderList()}
            </div>
        )
    }

    renderList() {
        return this.props.colors.map((color) => {
                return <ColorPicker
                    key={color.backgroundColor}
                    color={color.backgroundColor}/>
            }
        );
    }
}

function mapStateToProps(state) {
    return {
        colors: state.colors
    };
}

export default connect(mapStateToProps)(ColorZone)