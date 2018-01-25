import React, {Component} from 'react'
import CodeZone from './code-zone';
import ColorZone from './color-zone';
import DrawingZone from './drawing-zone';

export default class DevZone extends Component{
    render (){
        return (
            <div id="dev-zone">
                <ColorZone/>
                <CodeZone/>
                <DrawingZone/>
            </div>
        );
    }
}