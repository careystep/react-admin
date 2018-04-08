import React,{ Component } from 'react'
import { Table,Pagination,Button,Loading} from 'element-react'

// "lockFlag": "0",
//     "rptTypeName": "流动性覆盖率（LCR）计算表",
//     "branchName": "广发证券股份有限公司",
//     "rptCycle": "D",
//     "rptId": "R000004",
//     "id": 45984,
//     "jgbb": "1",
//     "rptDate": 20180112,
//     "rptName": "流动性覆盖率（LCR）计算表(监管)",
//     "kzjg": "1",
//     "rptType": 4

class List extends Component {
    constructor(props,context) {
        super(props,context)

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
                label:'OA帐号',
                prop:'loginName'
            },
            {
                label:'所属部门',
                prop:'org.name'
            },
            {
                label: '用户角色',
                prop: 'roleList',
                render: (col) => {
                    return (
                        <div>
                            {
                                col.roleList.length > 0
                                    ? col.roleList[0].name
                                    : ''
                            }
                        </div>
                    )
                }
            },
            {
                label:'操作',
                render: (col) => {
                    return (
                        <span>
                         <Button onClick={()=>{this.props.showRoleDialog(col)}} type="info" size="small">修改角色</Button>
                        </span>
                    )
                }
            }
        ]
    }
    render() {
        const columns = this.columns;
        const tableList = this.props.data;
        const pageInfo = this.props.pageInfo;
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
                    <div style={{textAlign:"center",padding:'10px 0'}}>
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
            </div>
        )
    }




}

export default List;