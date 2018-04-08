import React, { Component } from 'react';
import { Table,Pagination,Button,Loading} from 'element-react'

class List extends Component {

    constructor(props) {
        super(props);
        this.columns = [
            {
                label:'#',
                width: 100,
                type: 'index'
            },
            {
                label:'用户姓名',
                prop:'name'
            },
            {
                label:'角色编号',
                prop:'code'
            },
            {
                label:'角色用户',
                render: (col) => {
                    return <Button onClick={()=>{this.props.showUserDialog(col)}} type="text" size="small">查看用户</Button>
                }
            },
            {
                label:'操作',
                render: (col) => {
                    return (
                        <span>
                            <Button type='info' onClick={()=>{this.props.handleUpdate(col)}} size="small">修改</Button>
                            <Button type='danger' onClick={()=>{this.props.handleDelete(col)}} size="small">删除</Button>
                        </span>
                    )
                }
            }
        ]
    }
    render() {
        const columns = this.columns;
        const pageInfo = this.props.pageInfo;
        const tableList = this.props.data;
        const tableLoading = this.props.tableLoading;
        return (
            <div>
                <Loading loading={tableLoading}>
                    <Table
                        style={{width: '100%'}}
                        columns={columns}
                        data={tableList}
                        stripe={true}
                    />
                </Loading>

                {
                    tableList.length > 0
                    ? <div style={{textAlign:"center",padding:'10px 0'}}>
                        <Pagination
                            onCurrentChange={this.props.changePageNumber}
                            onSizeChange={this.props.changePageSize}
                            layout="total, sizes, prev, pager, next, jumper"
                            total={pageInfo.totalCount}
                            pageSizes={[10, 20, 50, 100]}
                            pageSize={pageInfo.pageSize}
                            currentPage={pageInfo.pageNum}
                        />
                    </div>
                    : ''
                }
            </div>
        )
    }
}

export default List;