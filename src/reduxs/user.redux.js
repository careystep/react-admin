const AUTH_SUCCESS = 'LOGIN_SUCESS';

const initState = {
    isAuth:false,
    name:'',
    loginName:'',
    menu:[]
};


//reducer

export function userReducer(state=initState,action) {
    switch (action.type) {
        case AUTH_SUCCESS:
            return {...state,isAuth:true,...action.payload};
        default:
            return state;
    }
}

export function authSuccess(data) {
    return {
        type:AUTH_SUCCESS,
        payload:data
    }
}