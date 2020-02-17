/**
 * axios的二次封装
 */

import axios from 'axios'

axios.defaults.timeout = 10000 //请求超时时间
axios.defaults.baseURL = 'https://www.liulongbin.top:8888/api/private/v1'

/**请求拦截器 */
axios.interceptors.request.use(
    config => {
        const token = window.sessionStorage.getItem('token')
        token && (config.headers.Authorization = token)
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

/**响应拦截器 */
axios.interceptors.response.use(
    response => {
        const res = response.data;
        //根据返回的状态码 作出逻辑处理
        //.......
        return res
    },
    error => {
        return Promise.reject(error);
    }
);


export default axios