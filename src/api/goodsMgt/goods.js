import request from '@/api/axios.js'

export default {

    /**获取商品列表 */
    getGoodsList(params) {
        return request({
            method: 'get',
            url: '/goods',
            params
        })
    },

    /**删除商品 */
    deleteGoods(id) {
        return request({
            method: 'delete',
            url: `/goods/${id}`,
        })
    }
}