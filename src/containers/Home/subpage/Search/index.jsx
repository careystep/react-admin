import React, {Component} from 'react'
import {Layout,Form,Input,Select} from 'element-react'
import services from '../../../../fetch'

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            roleOptions: []
        }
    }
    async componentDidMount() {
        try {
            const res = await services.getRoleOfSelect({data:{}})
            this.setState({roleOptions:res.data})
        }catch (error) {
            console.error('获取接口报错'+error)
        }
    }
    render() {
        return (
            <div className="search-box">
                <h3>用户管理</h3>
                <Form labelWidth="80">
                    <Layout.Row gutter="20">
                        <Layout.Col span="8">
                            <div className="grid-content bg-purple">
                                <Form.Item label="用户姓名:">
                                    <Input value={this.props['like@@u.name']} onChange={(val)=>{this.props.changeSearchAttr("like@@u.name",val)}}></Input>
                                </Form.Item>
                            </div>
                        </Layout.Col>
                        <Layout.Col span="8">
                            <div className="grid-content bg-purple">
                                <Form.Item label="OA账号:">
                                    <Input value={this.props['like@@u.loginName']} onChange={(val)=>{this.props.changeSearchAttr('like@@u.loginName',val)}}></Input>
                                </Form.Item>
                            </div>
                        </Layout.Col>
                        <Layout.Col span="8">
                            <div className="grid-content bg-purple">
                                <Form.Item label="用户角色:">
                                    <Select
                                        value={this.props['equal@@r.id']}
                                        onChange={(val)=>{this.props.changeSearchAttr("equal@@r.id",val)}}>
                                        {
                                            this.state.roleOptions.map(el => {
                                                return <Select.Option key={el.id} label={el.name} value={el.id} />
                                            })
                                        }
                                    </Select>
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