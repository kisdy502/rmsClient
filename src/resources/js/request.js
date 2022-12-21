import axios from 'axios'
import { getToken } from './auth'

// 创建axios实例
const httpService = axios.create({
    baseURL: process.env.BASE_API,
    timeout: 15000,
})

httpService.interceptors.request.use(config => {
    var token = getToken();
    if (token) {
        config.headers['Authorization'] = token;
    } else {
        console.warn("没有token信息");
    }
    config.headers["Content-Type"] = "application/json";
    // 仅开发环境更改请求地址，不影响上线请求
    if (process.env && process.env.NODE_ENV === 'development') {
        
    } else {
        console.warn("不是开发环境!");
    }
    return config;
}, error => {
    console.log(error) // for debug
    Promise.reject(error)
})

httpService.interceptors.response.use(response => {
    return response;
})
export default httpService;