import request from '@/api/axios.js'

export default {

    /**获取用户权限列表数据 */
    getRightsList() {
        return request({
            method: 'get',
            url: '/rights/list',
        })
    }
}