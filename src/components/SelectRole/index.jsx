import React,{ Component } from 'react'
import {Checkbox} from 'element-react'
import './style.css'

class SelectRole extends Component {

    render() {
        return (
            <div className="role-list-box">
                {
                    this.props.roles.map((role, index) => {
                            return (
                                <div className="box-item" key={role.selfId}>
                                    <Checkbox
                                        checked = {role.isSelect === 'true'}
                                        onChange={(flag)=>{
                                            this.props.changeRoleSelect(index,flag)
                                        }}
                                        key={role.selfId} label={role.nodeName}></Checkbox>
                                </div>
                            )

                        }
                    )
                }
            </div>
        )
    }

}

export default SelectRole