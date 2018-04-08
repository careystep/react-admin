import fetch from './fetch';

var services = {
    queryUsersInfo: data => fetch('api/risk/spvactiviti/1.0.2/gf-risk-process/activiti/queryUsersInfo', data),
}

export default services;