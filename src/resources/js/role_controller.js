import request from './request'

export function getRoleList() {
    return request({
        url: '/role/listAll',
        method: 'get',
        params: {
        }
    })
}