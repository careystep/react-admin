import React,{ Component } from 'react';
import {connect} from 'react-redux'
import services from '../../fetch'
import {authSuccess} from '../../reduxs/user.redux'

const allpath = [
    {
        name: "用户管理",
        path: "",
    },
    {
        name: "角色管理",
        path: "",

    },
    {
        name: "菜单管理",
        path: "",
    },
    {
        name: "数据管理",
        path: "",
    },
    {
        name: "菜单授权",
        path: "",
    },
    {
        name: "数据授权",
        path: ""
    },
    {
        name: "主页授权",
        path: ""
    }
]
function isInAllpath(path) {
    for(var i = 0; i < allpath.length; i++){
        if(path.name === allpath[i].name){
            return true;
        }
    }
    return false;
}
class Authroute extends Component {

    async componentDidMount() {
      const userInfo =  await services.queryUsersInfo();
      const {hashPath,name,loginName} = userInfo.data;
      let userPath = [];
        hashPath.forEach((path)=> {
            const flag = isInAllpath(path)
            if(flag){
                userPath.push(path);
            }
        })
        this.props.authSuccess({menu:userPath,name,loginName})
    }
    render() {
        return null
    }

}

export default connect((state) => state,{authSuccess})(Authroute);