import request from './request'

export function getUserList(keyword, pageSize, pageNum) {
    return request({
        url: '/admin/list',
        method: 'get',
        params: {
            keyword: keyword,
            pageSize: pageSize,
            pageNum: pageNum
        }
    })
}