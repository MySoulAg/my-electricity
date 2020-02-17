import request from '@/api/axios.js'

export default {

    /**获取侧边栏数据 */
    getMenuList() {
        return request({
            method: 'get',
            url: '/menus',
        })
    },
}