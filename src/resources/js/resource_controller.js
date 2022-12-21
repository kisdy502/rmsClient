import request from './request'


export function getResourceList() {
    return request({
        url: '/resource/listAll',
        method: 'get',

    })
}

export function getPageResourceList(categoryId, nameKeyword, urlKeyword, pageSize, pageNum) {
    return request({
        url: '/resource/list',
        method: 'get',
        params: {
            categoryId: categoryId,
            nameKeyword: nameKeyword,
            urlKeyword: urlKeyword,
            pageSize: pageSize,
            pageNum: pageNum
        }
    })
}


export function getResourceCategoryList() {
    return request({
        url: '/resourceCategory/listAll',
        method: 'get',
    })
}