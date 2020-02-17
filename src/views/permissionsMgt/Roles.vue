<template>
  <article>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <el-button type="primary">添加角色</el-button>
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
          <template></template>
        </el-table-column>
      </el-table>
    </el-card>
  </article>
</template>
<script>
export default {
  data() {
    return {
      tableData: [], //角色列表数据
      tableMaxHeight: 0 //表格的最大高度，根据浏览器的窗体大小而定
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
      this.$http.get("/roles").then(res => {
        console.log(res.data);
        if (res.data.meta.status == 200) {
          this.tableData = res.data.data;
        } else {
          this.$message.error(res.data.meta.msg);
        }
      });
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
          this.$http
            .delete(`/roles/${rolesId.id}/rights/${rightsId}`)
            .then(res => {
              console.log(res.data);
              if (res.data.meta.status == 200) {
                this.$message({
                  type: "success",
                  message: res.data.meta.msg
                });
                rolesId.children = res.data.data;
              } else {
                this.$message.error(res.data.meta.msg);
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