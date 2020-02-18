import request from '@/api/axios.js'

export default {

    /**获取用户列表数据 */
    getUsreInfoList(params) {
        return request({
            method: 'get',
            url: '/users',
            params
        })
    },

    /**删除用户 */
    deleteUser(params) {
        return request({
            method: 'delete',
            url: '/users/' + params,
        })
    },

    /**添加用户 */
    addUser(data) {
        return request({
            method: 'post',
            url: '/users',
            data
        })
    },

    /**修改用户信息 */
    editorUser(params, data) {
        return request({
            method: 'put',
            url: '/users/' + params,
            data
        })
    },

    /**改变用户状态 */
    changeType(params) {
        return request({
            method: 'put',
            url: `/users/${params.id}/state/${params.mg_state}`,
        })
    },

    /**获取角色列表 */
    getRolesList() {
        return request({
            method: 'get',
            url: '/roles',
        })
    },

    /**分配角色 */
    distributRole(id, rid) {
        return request({
            method: 'put',
            url: `/users/${id}/role`,
            data: {
                rid
            }
        })
    }
}