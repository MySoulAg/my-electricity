import request from '@/api/axios.js'

export default {

    /**获取订单列表 */
    getOrdersList(params) {
        return request({
            method: 'get',
            url: '/orders',
            params
        })
    },

}