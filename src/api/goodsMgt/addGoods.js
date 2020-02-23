import request from '@/api/axios.js'

export default {

    /**获取所有商品分类列表 */
    getGoodsClass() {
        return request({
            method: 'get',
            url: '/categories',
        })
    },

    /**获取商品参数 或 属性*/
    getGoodsInfo(id, params) {
        return request({
            method: 'get',
            url: `/categories/${id}/attributes`,
            params
        })
    },

    /**添加商品 */
    addGoods(data) {
        return request({
            method: 'post',
            url: 'goods',
            data
        })
    }

}