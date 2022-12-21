import request from './request'

export function login(username, password) {
    return request({
        url: '/admin/login',
        method: 'post',
        data: {
            username,
            password
        },
    })
}

export function getRoleList(adminId) {
    return request({
        url: '/admin/role' + adminId,
        method: 'post',
    })
}

export function getInfo() {
    return request({
      url: '/admin/info',
      method: 'get',
    })
  }

export function getAuthCode(phone) {
    return request({
        url: '/sso/getAuthCode',
        method: 'get',
        params: {
            telephone: phone
        }
    })
}


