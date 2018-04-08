import React,{ Component } from 'react'
import './style.css'


class Dashboard extends Component {
    render() {
        return (
            <div id="dashboard" className="dashboard">
                {this.props.children}
            </div>
        )
    }

}

export default Dashboard