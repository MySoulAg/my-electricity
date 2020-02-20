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

    /**添加动态参数 或 静态属性 */
    addAttributes(id, data) {
        return request({
            method: 'post',
            url: `/categories/${id}/attributes`,
            data
        })
    },

    /**修改动态参数 或 静态属性 */
    editorAttributes(id, attrId, data) {
        return request({
            method: 'put',
            url: `/categories/${id}/attributes/${attrId}`,
            data
        })
    },

    /**删除参数 */
    deleteAttributes(id, attrId) {
        return request({
            method: 'delete',
            url: `/categories/${id}/attributes/${attrId}`,
        })
    }
}