import request from '@/api/axios.js'

export default {

    /**获取商品分类列表数据 */
    getCategoriesList(params) {
        return request({
            method: 'get',
            url: '/categories',
            params
        })
    },

    /**获取所有商品前二级的分类 */
    getCategories(params) {
        return request({
            method: 'get',
            url: '/categories',
            params
        })
    },

    /**添加分类 */
    addCategories(data) {
        return request({
            method: 'post',
            url: '/categories',
            data
        })
    }
}