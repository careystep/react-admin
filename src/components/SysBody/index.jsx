import React,{ Component } from 'react'
import './style.css'


class SysBody extends Component {
    render() {
        return (
            <div id="sysBody" className="sysBody">
                <div className="containers">
                    {this.props.children}
                </div>
            </div>
        )
    }

}

export default SysBody