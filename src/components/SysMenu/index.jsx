import React,{ Component } from 'react'
import {connect} from 'react-redux'
import './style.css'


class SysMenu extends Component {
    render() {
        return (
            <div id="sysMenu" className="sysMenu">
                <div className="user-top">
                    <img src={require(`../../images/user.png`)} />
                    <p className="user-name">{
                        this.props.user.isAuth
                        ? this.props.user.name
                        : '???'
                    }</p>
                </div>
                <ul className="user-menu">
                    <li>
                        <a>主页</a>
                    </li>
                    {
                        this.props.user.menu.map((path)=>{
                            return (
                                <li>
                                    <a>{path.name}</a>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        )
    }

}

export default connect((state) => state,{})(SysMenu)