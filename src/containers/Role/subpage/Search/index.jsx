import React, { Component } from 'react';
import {Layout,Form,Input,Select} from 'element-react'

class Search extends Component {

    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="search-box">
                <h3>角色管理</h3>
                <Form labelWidth="80">
                    <Layout.Row gutter="20">
                        <Layout.Col span="8">
                            <div className="grid-content bg-purple">
                                <Form.Item label="角色名称:">
                                    <Input value={this.props['like@@name']} onChange={(val)=>{this.props.changeSearchAttr("like@@name",val)}}></Input>
                                </Form.Item>
                            </div>
                        </Layout.Col>
                        <Layout.Col span="8">
                            <div className="grid-content bg-purple">
                                <Form.Item label="角色编码:">
                                    <Input value={this.props['like@@code']} onChange={(val)=>{this.props.changeSearchAttr('like@@code',val)}}></Input>
                                </Form.Item>
                            </div>
                        </Layout.Col>

                    </Layout.Row>
                </Form>
            </div>
        )
    }
}

export default Search;