<template>
  <article>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>参数列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <el-alert title="注意：只允许为第三级分类设置相关参数！" type="warning" show-icon></el-alert>
      <div class="select">
        选择商品分类:
        <el-cascader
          v-model="cascaderValue"
          :options="options"
          :props="props"
          @change="handleChange"
        ></el-cascader>
      </div>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="动态参数" name="many">
          <el-button :disabled="isDisabled1" size="mini" type="primary">添加参数</el-button>
          <!-- 参数表格 -->
          <el-table stripe border :data="tableData1" style="width: 100%">
            <el-table-column align="center" type="expand">
              <template slot-scope="scope">{{scope.row.attr_vals}}</template>
            </el-table-column>
            <el-table-column align="center" type="index" :index="1" label="#"></el-table-column>
            <el-table-column align="center" prop="attr_name" label="参数名称"></el-table-column>
            <el-table-column align="center" label="操作">
              <template slot-scope="scope">
                <el-button
                  @click="handleEdit1(scope.row)"
                  type="primary"
                  icon="el-icon-edit"
                  size="mini"
                >修改</el-button>
                <el-button
                  @click="handleDelete1(scope.row)"
                  type="danger"
                  icon="el-icon-delete"
                  size="mini"
                >删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="静态参数" name="only">
          <el-button :disabled="isDisabled2" size="mini" type="primary">添加属性</el-button>
          <!-- 属性表格 -->
          <el-table stripe border :data="tableData2" style="width: 100%">
            <el-table-column align="center" type="expand">
              <template slot-scope="scope">{{scope.row.attr_vals}}</template>
            </el-table-column>
            <el-table-column align="center" type="index" :index="1" label="#"></el-table-column>
            <el-table-column align="center" prop="attr_name" label="属性名称"></el-table-column>
            <el-table-column align="center" label="操作">
              <template slot-scope="scope">
                <el-button
                  @click="handleEdit2(scope.row)"
                  type="primary"
                  icon="el-icon-edit"
                  size="mini"
                >修改</el-button>
                <el-button
                  @click="handleDelete2(scope.row)"
                  type="danger"
                  icon="el-icon-delete"
                  size="mini"
                >删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </article>
</template>
<script>
import request from "@/api/goodsMgt/params.js";
export default {
  data() {
    return {
      cascaderValue: [], //级联选择框选中的值
      threeId: "", //级联选择框选中值的 第三级ID
      sel: "many", //默认参数
      options: [], //级联选择框的可选值
      props: {
        expandTrigger: "hover",
        value: "cat_id",
        label: "cat_name",
        children: "children"
      }, //级联选择框的参数配饰
      activeName: "many", //默认显示的tab项
      tableData1: [], //动态表格数据
      tableData2: [], //属性表格数据
      isDisabled1: true, //添加参数按钮是否禁用
      isDisabled2: true //添加属性按钮是否禁用
    };
  },

  created() {
    this.getCategories();
  },

  methods: {
    /**获取所有商品的分类 */
    getCategories() {
      request.getCategories().then(res => {
        console.log(res);
        if (res.meta.status == 200) {
          this.options = res.data;
        } else {
          this.$message.error(res.meta.msg);
        }
      });
    },

    /**添加分类的下拉框改变选择时 */
    handleChange(value) {
      console.log(value);
      if (value.length != 3) {
        this.isDisabled1 = true;
        this.isDisabled2 = true;
        this.cascaderValue = [];
        this.threeId = "";
      } else {
        this.isDisabled1 = false;
        this.isDisabled2 = false;
        this.threeId = value[value.length - 1];
        console.log(this.threeId);
        this.getCategoriesList();
      }
    },

    /**获取参数列表 */
    getCategoriesList() {
      request.getCategoriesList(this.threeId, this.sel).then(res => {
        console.log(res);
        if (res.meta.status == 200) {
          if (this.sel == "many") {
            //动态
            this.tableData1 = res.data;
          } else {
            //静态
            this.tableData2 = res.data;
          }
        } else {
          this.$message.error(res.meta.msg);
        }
      });
    },

    /**tab切换时 */
    handleClick(tab) {
      this.sel = tab.name;
      if (this.cascaderValue.length != 0) {
        this.getCategoriesList();
      }
    },

    /**
     * 点击操作栏 的编辑
     */
    handleEdit1() {
      this.$message.error("待开发");
    },

    /**
     * 点击操作栏 的编辑
     */
    handleEdit2() {
      this.$message.error("待开发");
    },

    /**
     * 点击操作栏 的删除
     */
    handleDelete1() {
      this.$message.error("待开发");
    },

    /**
     * 点击操作栏 的删除
     */
    handleDelete2() {
      this.$message.error("待开发");
    }
  }
};
</script>
<style lang="less" scoped>
.el-breadcrumb {
  padding-bottom: 20px;
}

.select {
  padding: 20px 0;
}

.el-table {
  margin-top: 15px;
}
</style>