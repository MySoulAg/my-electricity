<template>
  <article>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <el-button type="primary" @click="handleAddRoles">添加角色</el-button>
      <!-- 表格 -->
      <el-table stripe border :data="tableData" style="width: 100%" :max-height="tableMaxHeight">
        <el-table-column align="center" type="expand">
          <template slot-scope="scope">
            <el-row class="expandRowOne" v-for="item in scope.row.children" :key="item.id">
              <!-- 第一列 -->
              <el-col :span="6">
                <el-tag @close="deleteTag(scope.row,item.id)" closable>{{item.authName}}</el-tag>
                <i class="el-icon-caret-right"></i>
              </el-col>
              <el-col :span="18">
                <!-- 第二列 -->
                <el-row class="expandRowTwo" v-for="item2 in item.children" :key="item2.id">
                  <el-col :span="8">
                    <el-tag
                      @close="deleteTag(scope.row,item2.id)"
                      closable
                      type="success"
                    >{{item2.authName}}</el-tag>
                    <i class="el-icon-caret-right"></i>
                  </el-col>
                  <el-col :span="16">
                    <el-tag
                      @close="deleteTag(scope.row,item3.id)"
                      closable
                      v-for="item3 in item2.children"
                      :key="item3.id"
                      type="warning"
                    >{{item3.authName}}</el-tag>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column align="center" type="index" :index="1" label="#"></el-table-column>
        <el-table-column align="center" prop="roleName" label="角色名称"></el-table-column>
        <el-table-column align="center" prop="roleDesc" label="角色描述"></el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button
              @click="handleEdit(scope.row)"
              type="primary"
              icon="el-icon-edit"
              size="mini"
            >编辑</el-button>
            <el-button
              @click="handleDelete(scope.row)"
              type="danger"
              icon="el-icon-delete"
              size="mini"
            >删除</el-button>
            <el-button type="warning" icon="el-icon-setting" size="mini" @click="handlePerm">分配权限</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 添加角色弹出层 -->
    <el-dialog title="添加角色" :visible.sync="dialogFormAdd" @closed="closeAddRolesDialog">
      <el-form :model="addRoles" :rules="addRolesRules" ref="addRolesForm">
        <el-form-item label="角色名称" label-width="80px" prop="roleName">
          <el-input v-model="addRoles.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" label-width="80px" prop="roleDesc">
          <el-input v-model="addRoles.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormAdd = false">取 消</el-button>
        <el-button type="primary" @click="addConfirm">确 定</el-button>
      </div>
    </el-dialog>
  </article>
</template>
<script>
import request from "@/api/permissionsMgt/roles.js";
export default {
  data() {
    return {
      tableData: [], //角色列表数据
      tableMaxHeight: 0, //表格的最大高度，根据浏览器的窗体大小而定
      dialogFormAdd: false, //是否显示 添加用户弹出层
      addRoles: {
        roleName: "", //角色名称
        roleDesc: "" //角色描述
      }, //添加角色 表单
      addRolesRules: {
        roleName: [
          { required: true, message: "请输入角色名称", trigger: "blur" }
        ],
        roleDesc: [
          { required: true, message: "请输入角色描述", trigger: "blur" }
        ]
      } //添加角色 的验证规则
    };
  },

  created() {
    this.getRolesList();
    this.tableMaxHeight = window.innerHeight - 240; //表格的最大高度，根据浏览器的窗体大小而定
  },

  methods: {
    /**
     *获取角色列表
     */
    getRolesList() {
      request.getRolesList().then(res => {
        if (res.meta.status == 200) {
          this.tableData = res.data;
        } else {
          this.$message.error(res.meta.msg);
        }
      });
    },

    /**
     * 点击操作栏 的编辑
     */
    handleEdit() {
      this.$message.error("待开发");
    },

    /**
     * 点击操作栏 的删除
     */
    handleDelete() {
      this.$message.error("待开发");
    },
    
    /**
     * 点击操作栏 的分配权限
     */
    handlePerm() {
      this.$message.error("待开发");
    },

    /**
     * 点击添加角色弹出层的 确认
     */
    addConfirm() {
      this.$refs.addRolesForm.validate(valid => {
        if (valid) {
          //预校验成功 能够提交
          request.addRoles(this.addRoles).then(res => {
            console.log(res);
            if (res.meta.status == 201) {
              this.$message({
                type: "success",
                message: "添加成功!"
              });
              this.getRolesList();
              this.dialogFormAdd = false;
            }
          });
        } else {
          //预校验失败

          return false;
        }
      });
    },

    /**
     * 点击 添加角色
     */
    handleAddRoles() {
      this.dialogFormAdd = true;
    },

    /**
     * 添加角色的弹出层关闭时调用
     */
    closeAddRolesDialog() {
      this.$refs.addRolesForm.resetFields();
    },

    /**
     *点击标签中得清除
     */
    deleteTag(rolesId, rightsId) {
      this.$confirm("确定删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          request.deleteRoles(rolesId, rightsId).then(res => {
            if (res.meta.status == 200) {
              this.$message({
                type: "success",
                message: res.meta.msg
              });
              rolesId.children = res.data;
            } else {
              this.$message.error(res.meta.msg);
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  }
};
</script>
<style lang="less" scoped>
.el-breadcrumb {
  padding-bottom: 20px;
}

.el-table {
  margin-top: 20px;
}

.expandRowOne {
  border-bottom: 1px solid rgb(238, 238, 238);
  display: flex;
  align-items: center;
}

.expandRowOne:first-of-type {
  border-top: 1px solid rgb(238, 238, 238);
}

.expandRowTwo {
  border-bottom: 1px solid rgb(238, 238, 238);
  display: flex;
  align-items: center;
}

.expandRowTwo:last-of-type {
  border-bottom: none;
}

.el-tag {
  margin: 10px 5px;
}
</style>