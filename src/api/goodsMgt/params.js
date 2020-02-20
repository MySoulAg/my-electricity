import request from '@/api/axios.js'

export default {

    /**获取所有商品的分类 */
    getCategories() {
        return request({
            method: 'get',
            url: '/categories',
        })
    },

    /**获取参数列表 */
    getCategoriesList(id, sel) {
        return request({
            method: 'get',
            url: `/categories/${id}/attributes`,
            params: {
                sel
            }
        })
    },
}