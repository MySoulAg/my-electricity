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
    deleteRoles(rolesId,rightsId){
        return request({
            method: 'delete',
            url: `/roles/${rolesId.id}/rights/${rightsId}`,
        })
    }
}