import request from '@/api/axios.js'

export default {

    /**登陆 */
    login(data) {
        return request({
            method: 'post',
            url: '/login',
            data
        })
    },
}