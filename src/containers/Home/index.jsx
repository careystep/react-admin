import React, { Component } from 'react';
import {Button,Dialog,Loading,Message} from 'element-react'
import TableList from './subpage/List'
import Search from './subpage/Search'
import SelectRole from '../../components/SelectRole'
import services from '../../fetch'

const initSearch = {
    "like@@u.name":"",
    "like@@u.loginName":"",
    "equal@@r.id":""
}
const initUserRole = {
    dialogRole: false,
    roleList: [],
    currentUserId:'',
    currentUserName:''
}
const createSearchData = (data) => {
    const searchData = {};
    Object.keys(data).forEach((key) => {
        const attrs = key.split('@@');
        if(!searchData[attrs[0]]){
            searchData[attrs[0]] = {}
        }
        searchData[attrs[0]][attrs[1]] = data[key];
    })
    return searchData;
}
class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            fullscreen: false,
            tableLoading: false,
            userRole: {
                ...initUserRole
            },
            pageInfo: {
                pageSize:10,
                totalCount:0,
                pageCount:0,
                pageNum:1
            },
            search: {
                ...initSearch
            },
            data:[]
        };
        this.changePageSize = this.changePageSize.bind(this)
        this.changePageNumber = this.changePageNumber.bind(this)
        this.changeSearchAttr = this.changeSearchAttr.bind(this)
        this.resetSearch = this.resetSearch.bind(this)
        this.handleSearch = this.handleSearch.bind(this)
        this.showRoleDialog = this.showRoleDialog.bind(this)
        this.changeRoleSelect = this.changeRoleSelect.bind(this)
        this.updateRoleSelect = this.updateRoleSelect.bind(this)
        this.hideRoleDialog = this.hideRoleDialog.bind(this)
    }
    componentDidMount() {
        this.handleSearch();
    }
    render() {
        return (
            <div>
                {this.state.fullscreen && <Loading fullscreen={true} />}
                <Search
                    {...this.state.search}
                    changeSearchAttr={this.changeSearchAttr}
                />
                <div className="handel-btn-box">
                    <Button type="success" onClick={this.handleSearch}>查询</Button>
                    <Button type="danger"  onClick={this.resetSearch}>重置</Button>
                </div>
                <TableList
                    pageInfo={this.state.pageInfo}
                    data = {this.state.data}
                    tableLoading = {this.state.tableLoading}
                    changePageSize = {this.changePageSize}
                    changePageNumber = {this.changePageNumber}
                    showRoleDialog = {this.showRoleDialog}
                />
                <Dialog
                    title="提示"
                    size="tiny"
                    visible={ this.state.userRole.dialogRole }
                    onCancel={ this.hideRoleDialog }
                    lockScroll={ false }
                >
                    <Dialog.Body>
                        <SelectRole
                            changeRoleSelect = {this.changeRoleSelect}
                            roles={this.state.userRole.roleList}
                        />
                    </Dialog.Body>
                    <Dialog.Footer className="dialog-footer">
                        <Button onClick={ this.hideRoleDialog }>取消</Button>
                        <Button type="primary" onClick={ this.updateRoleSelect }>确定</Button>
                    </Dialog.Footer>
                </Dialog>
            </div>
        );
    }
    async updateRoleSelect() {

        const selectRoleIds =  this.state.userRole.roleList.filter((role)=>role.isSelect === 'true').map((role) => role.selfId)

        try {
            this.setState({fullscreen:true})
            await services.saveRoleOfUser(this.state.userRole.currentUserId,{data:selectRoleIds})
            Message({
                customClass:'custom-message',
                type:"success",
                message:this.state.userRole.currentUserName+' 修改角色信息成功'
            });
            this.setState({fullscreen:false,userRole:{...initUserRole}})
        }catch (error) {
            console.error('保存用户的角色出错'+error)
        }

    }
    changeRoleSelect(index,flag) {

        const {roleList} = this.state.userRole
        roleList[index]['isSelect'] = flag ? 'true' : 'false'
        this.setState({userRole:{...this.state.userRole,roleList:[...roleList]}})

    }
    async showRoleDialog(user) {
        this.setState({fullscreen:true})
        const res = await services.getRoleOfUser(user.id,{method:'get'})
        this.setState({fullscreen:false,userRole:{...this.state.userRole,roleList:res.data,dialogRole:true,currentUserId:user.id,currentUserName:user.name}})
    }
    hideRoleDialog() {
        this.setState({userRole:{...initUserRole}})
    }
    handleSearch() {
        this.changePage({pageNumber:1});
    }
    resetSearch() {
        this.setState({search:{...initSearch}})
        this.handleSearch();
    }
    changeSearchAttr(key,value) {
        const nextState = {[key]:value};
        this.setState({search:{...this.state.search,...nextState}});
    }
    changePageSize(size) {
        this.changePage({pageSize:size})
    }
    changePageNumber(num = 1) {
        this.changePage({pageNumber:num})
    }
    async changePage(
        {
            pageNumber = this.state.pageInfo.pageNum,
            pageSize = this.state.pageInfo.pageSize
        }
    ) {

        try {
            const searchData = createSearchData(this.state.search);
            const resultPage = {"page":{pageSize,pageNumber}}
            this.setState({tableLoading:true})
            const userlist = await services.getUserList({data:{...resultPage,...searchData}});

            this.setState({data:userlist.data,
                tableLoading:false,
                pageInfo:{
                    pageSize:userlist.page.pageSize,
                    totalCount:userlist.page.totalCount,
                    pageCount:userlist.page.totalCount/userlist.page.pageSize,
                    pageNum:userlist.page.pageNumber
                }
            });
        }catch (error) {
            console.error('user列表模块获取数据报错 ', error)
        }
    }
}


export default Home;
