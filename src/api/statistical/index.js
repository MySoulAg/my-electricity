import request from '@/api/axios.js'

export default {

    /**获取数据 */
    getReports() {
        return request({
            method: 'get',
            url: '/reports/type/1',
        })
    },

}