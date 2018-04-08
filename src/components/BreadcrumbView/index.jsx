import React,{ Component } from 'react'
import { Breadcrumb } from 'element-react'

class BreadcrumbView extends Component {

    render() {
        return (
            <div style={{padding:'10px 20px'}}>
                <Breadcrumb separator="/">
                    <Breadcrumb.Item>首页</Breadcrumb.Item>
                    <Breadcrumb.Item>活动管理</Breadcrumb.Item>
                    <Breadcrumb.Item>活动列表</Breadcrumb.Item>
                    <Breadcrumb.Item>活动详情</Breadcrumb.Item>
                </Breadcrumb>
            </div>
        )
    }

}

export default BreadcrumbView;