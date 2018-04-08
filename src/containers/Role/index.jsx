import React, { Component } from 'react';
import Search from './subpage/Search'
import TableList from './subpage/List'
import Edit from './subpage/Edit'
import {Button,Dialog} from 'element-react'
import services from '../../fetch'
import ClassifyUser from '../../components/ClassifyUser'
import createSearchData from '../../util/searchData'

const initState = {
    'like@@name': '',
    'like@@code': ''
}
const initEdit = {
    id:'',
    name: '',
    code: ''
}
class Role extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tableLoading: false,
            search: {...initState},
            edit: {
                visible: false,
                ...initEdit
            },
            pageInfo: {
                pageSize:10,
                totalCount:0,
                pageCount:0,
                pageNum:1
            },
            data:[]
        }
        this.changeSearchAttr = this.changeSearchAttr.bind(this)
        this.changeEditAttr = this.changeEditAttr.bind(this)
        this.handleSearch = this.handleSearch.bind(this)
        this.handleUpdate = this.handleUpdate.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
        this.changePageSize = this.changePageSize.bind(this)
        this.changePageNumber = this.changePageNumber.bind(this)
        this.showUserDialog = this.showUserDialog.bind(this)
        this.resetSearch = this.resetSearch.bind(this)
        this.hideEditDialog = this.hideEditDialog.bind(this)
        this.handleEdit = this.handleEdit.bind(this)
    }
    componentDidMount() {
        this.handleSearch();
    }
    render() {
        return (
            <div>
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
                    handleUpdate = {this.handleUpdate}
                    handleDelete = {this.handleDelete}
                    showUserDialog = {this.showUserDialog}
                />
                <Dialog
                    title="提示"
                    size="tiny"
                    visible={ this.state.edit.visible }
                    onCancel={ this.hideEditDialog }
                    lockScroll={ false }
                >
                    <Dialog.Body>
                        <Edit
                            {...this.state.edit}
                            changeEditAttr={this.changeEditAttr}
                        />
                    </Dialog.Body>
                    <Dialog.Footer className="dialog-footer">
                        <Button onClick={ this.hideEditDialog }>取消</Button>
                        <Button type="primary" onClick={ this.handleEdit }>确定</Button>
                    </Dialog.Footer>
                </Dialog>
            </div>
        )
    }
    handleSearch() {
        this.changePage({pageNumber:1})
    }
    resetSearch() {
        this.setState({search:{...initState}});
        this.handleSearch();
    }
    changeSearchAttr(key,value) {
        const nextState = {[key]:value};
        this.setState({search:{...this.state.search,...nextState}});
    }
    changeEditAttr(key,value) {

        const nextState = {[key]:value};
        this.setState({edit:{...this.state.edit,...nextState}});
    }
    changePageSize(size) {
        this.changePage({pageSize:size})
    }
    changePageNumber(num = 1) {
        this.changePage({pageNumber:num})
    }
    hideEditDialog() {
        this.setState({edit:{
            visible: false,
            ...initEdit
        }})
    }
    handleEdit() {
        const {visible,...data} = this.state.edit;
        console.log(data);
    }
    handleUpdate(role) {
        const {name,code,id} = role;
        this.setState({edit:{
            visible: true,
            name,
            code,
            id
        }})
    }
    handleDelete(role) {

    }
    showUserDialog() {

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
            const list = await services.getRoleList({data:{...resultPage,...searchData}});

            this.setState({data:list.data,
                tableLoading:false,
                pageInfo:{
                    pageSize:list.page.pageSize,
                    totalCount:list.page.totalCount,
                    pageCount:list.page.totalCount/list.page.pageSize,
                    pageNum:list.page.pageNumber
                }
            });
        }catch (error) {
            console.error('user列表模块获取数据报错 ', error)
        }
    }
}

export default Role;