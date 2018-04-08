import React, { Component } from 'react';
import {Form,Input} from 'element-react'

class List extends Component {

    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <Form labelPosition="left">
                    <Form.Item label="角色名称">
                        <Input type="text"
                               value={this.props.name}
                               onChange={(val)=>this.props.changeEditAttr('name',val)}
                        />
                    </Form.Item>
                    <Form.Item label="角色编号">
                        <Input type="text"
                               value={this.props.code}
                               onChange={(val)=>this.props.changeEditAttr('code',val)}
                        />
                    </Form.Item>
                </Form>
            </div>
        )
    }
}

export default List;