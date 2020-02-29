<template>
  <article>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <!-- 表格 -->
      <el-table stripe border :data="tableData" style="width: 100%" :max-height="tableMaxHeight">
        <el-table-column align="center" type="index" :index="1" label="#"></el-table-column>
        <el-table-column align="center" prop="authName" label="权限名称"></el-table-column>
        <el-table-column align="center" prop="path" label="路径"></el-table-column>
        <el-table-column align="center" label="权限等级">
          <template slot-scope="scope">
            <span
              v-show="isShow"
              class="level"
              :class="handleLevel(scope.row.level).className"
            >{{handleLevel(scope.row.level).text}}</span>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </article>
</template>
<script>
import request from "@/api/permissionsMgt/rights.js";
export default {
  data() {
    return {
      tableData: [], //权限列表数据
      tableMaxHeight: 0, //表格的最大高度，根据浏览器的窗体大小而定
      isShow: false
    };
  },

  created() {
    this.getRightsList();
    this.tableMaxHeight = window.innerHeight - 180; //表格的最大高度，根据浏览器的窗体大小而定
  },

  methods: {
    /**
     * 获取用户权限列表数据
     */
    getRightsList() {
      request.getRightsList().then(res => {
        this.isShow = true;
        if (res.meta.status == 200) {
          this.tableData = res.data;
        } else {
          this.$message.error(res.meta.msg);
        }
      });
    },

    /**
     * 动态渲染权限等级
     */
    handleLevel(level) {
      const obj = {
        "0": {
          text: "一级",
          className: "one"
        },
        "1": {
          text: "二级",
          className: "two"
        },
        "2": {
          text: "三级",
          className: "three"
        }
      };
      return obj[level];
    }
  }
};
</script>
<style lang="less" scoped>
article {
  flex-shrink: 0;
  width: 100%;
}

.el-breadcrumb {
  padding-bottom: 20px;
}

.level {
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 12px;
  border: 1px solid #fff;
  line-height: 30px;
}

.level.one {
  background-color: #ecf5ff;
  border-color: #cae4ff;
  color: #409eff;
}

.level.two {
  background-color: #ebf5e7;
  border-color: #d1eac4;
  color: #3ac267;
}

.level.three {
  background-color: rgba(230, 162, 60, 0.1);
  border-color: rgba(230, 162, 60, 0.2);
  color: #e6a23c;
}
</style>