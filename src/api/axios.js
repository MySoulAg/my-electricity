/**
 * axios的二次封装
 */

import axios from 'axios'
import NProgress from 'nprogress'
import {
    Message
} from 'element-ui';

axios.defaults.timeout = 10000 //请求超时时间
axios.defaults.baseURL = 'https://www.liulongbin.top:8888/api/private/v1'

/**请求拦截器 */
axios.interceptors.request.use(
    config => {
        NProgress.start();
        const token = window.sessionStorage.getItem('token')
        token && (config.headers.Authorization = token)
        return config
    },
    error => {
        console.log(11111111111)
        return Promise.reject(error)
    }
)

/**响应拦截器 */
axios.interceptors.response.use(
    response => {
        NProgress.done();
        const res = response.data;
        //根据返回的状态码 作出逻辑处理
        //.......
        return res
    },
    error => {
        if (error.message.indexOf('timeout') != -1) {
            Message.error('本次请求超时，请重试！')
        } else {
            Message.error('系统请求异常')
        }
        NProgress.done();
        return Promise.reject(error);
    }
);


export default axios