import request from '@/api/axios.js'

export default {

    /**获取角色列表 */
    getRolesList() {
        return request({
            method: 'get',
            url: '/roles',
        })
    },

    /**删除权限 */
    deleteRoles(rolesId, rightsId) {
        return request({
            method: 'delete',
            url: `/roles/${rolesId.id}/rights/${rightsId}`,
        })
    },

    /**添加角色 */
    addRoles(data) {
        return request({
            method: 'post',
            url: '/roles',
            data
        })
    },

    /**获取用户权限 树形列表 */
    getPermTree() {
        return request({
            method: 'get',
            url: '/rights/tree',
        })
    },

    /**修改角色授权 */
    editorPerm(id, parm) {
        return request({
            method: 'post',
            url: `/roles/${id}/rights`,
            data: {
                rids: parm
            }
        })
    }
}