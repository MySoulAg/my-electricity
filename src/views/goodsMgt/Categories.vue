<template>
  <article>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品分类</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <!-- 搜索部分 -->

      <el-button type="primary" @click="addCategories">添加分类</el-button>

      <!-- 表格 -->
      <zk-table
        :style="{'max-height':tableMaxHeight+'px'}"
        ref="table"
        sum-text="sum"
        index-text="#"
        :data="tableData"
        :columns="columns"
        :stripe="true"
        :border="true"
        :show-index="true"
        :tree-type="true"
        :expand-type="false"
        :selection-type="false"
      >
        <!-- 是否有效 -->
        <template slot="isEffective" slot-scope="scope">
          <i v-if="!scope.row.cat_deleted" class="el-icon-success"></i>
          <i v-if="scope.row.cat_deleted" class="el-icon-error"></i>
        </template>
        <!-- 排序 -->
        <template slot="sort" slot-scope="scope">
          <el-tag size="mini" v-if="scope.row.cat_level==0">一级</el-tag>
          <el-tag size="mini" v-if="scope.row.cat_level==1" type="success">二级</el-tag>
          <el-tag size="mini" v-if="scope.row.cat_level==2" type="warning">三级</el-tag>
        </template>
        <!-- 操作 -->
        <template slot="operation" slot-scope="scope">
          <el-button size="mini" type="primary" icon="el-icon-edit" @click="handleEdit(scope)">编辑</el-button>
          <el-button size="mini" type="danger" icon="el-icon-delete" @click="handleDelete(scope)">删除</el-button>
        </template>
      </zk-table>
      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageParams.pagenum"
        :page-sizes="[2, 5, 10, 20]"
        :page-size="pageParams.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>

    <!-- 修改分类弹出层 -->
    <el-dialog title="修改分类" :visible.sync="dialogClassify" @closed="closeClassifyDialog">
      <el-form :model="ClassifyForm" :rules="ClassifyRules" ref="ClassifyForm" label-width="100px">
        <el-form-item label="分类名称" prop="classifyName">
          <el-input v-model="ClassifyForm.classifyName"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogClassify = false">取 消</el-button>
        <el-button type="primary" @click="ClassifyConfirm">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 添加分类弹出层 -->
    <el-dialog title="添加分类" :visible.sync="addDialog" @closed="closeAddDialog">
      <el-form :model="addForm" :rules="addRules" ref="addForm" label-width="100px">
        <el-form-item label="分类名称" prop="cat_name">
          <el-input v-model="addForm.cat_name"></el-input>
        </el-form-item>

        <el-form-item label="父级分类">
          <el-cascader
            v-model="cascaderValue"
            :options="options"
            :props="props"
            @change="handleChange"
          ></el-cascader>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addDialog = false">取 消</el-button>
        <el-button type="primary" @click="addConfirm">确 定</el-button>
      </div>
    </el-dialog>
  </article>
</template>
<script>
import request from "@/api/goodsMgt/categories.js";
export default {
  data() {
    return {
      cascaderValue: [], //级联选择框选中的值
      props: {
        expandTrigger: "hover",
        value: "cat_id",
        label: "cat_name",
        children: "children",
        checkStrictly: "true"
      }, //级联选择框的参数配饰
      options: [], //级联选择框的可选值

      ClassifyForm: {
        classifyName: "" //分类名称
      }, //修改分类表单
      addForm: {
        cat_name: "", //分类名称
        cat_pid: 0, //父级分类ID
        cat_level: 0 //分类层级
      }, //添加分类表单
      tableMaxHeight: 0, //表格的最大高度，根据浏览器的窗体大小而定
      dialogClassify: false, //是否显示修改分类弹出层
      addDialog: false, //是否显示添加分类弹出层
      tableData: [], //表格数据
      columns: [
        {
          label: "分类名称",
          prop: "cat_name",
          width: "200px"
        },
        {
          label: "是否有效",
          width: "100px",
          type: "template",
          template: "isEffective"
        },
        {
          label: "排序",
          type: "template",
          template: "sort"
        },
        {
          label: "操作",
          minWidth: "200px",
          type: "template",
          template: "operation"
        }
      ], //表格的配置项
      pageParams: {
        type: 3, //获取所有级别的分类
        pagenum: 1, //当前页码
        pagesize: 10 //每页显示条数
      },
      total: 0, //总页数
      ClassifyRules: {
        classifyName: [
          { required: true, message: "请输入分类名称", trigger: "blur" }
        ]
      },
      addRules: {
        cat_name: [
          { required: true, message: "请添加分类名称", trigger: "blur" }
        ]
      }
    };
  },

  created() {
    this.getCategoriesList();
    this.tableMaxHeight = window.innerHeight - 290; //表格的最大高度，根据浏览器的窗体大小而定
  },

  methods: {
    /**获取商品分类列表数据 */
    getCategoriesList() {
      request.getCategoriesList(this.pageParams).then(res => {
        console.log(res);
        if (res.meta.status == 200) {
          this.total = res.data.total;
          this.tableData = res.data.result;
        } else {
          this.$message.error(res.meta.msg);
        }
      });
    },

    /**获取所有商品前二级的分类 */
    getCategories() {
      request.getCategories({ type: 2 }).then(res => {
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
      if (value.length > 0) {
        this.addForm.cat_pid = value[value.length - 1];
        this.addForm.cat_level = value.length;
      } else {
        this.addForm.cat_pid = 0;
        this.addForm.cat_level = 0;
      }
    },

    /**点击操作栏的 编辑 */
    handleEdit(scope) {
      this.ClassifyForm.classifyName = scope.row.cat_name;
      this.dialogClassify = true;
    },

    /**点击操作栏的 删除 */
    handleDelete(scope) {
      console.log(scope);
      this.$message.error("待开发");
    },

    /**点击修改分类弹出层的 确定 */
    ClassifyConfirm() {
      this.$refs.ClassifyForm.validate(valid => {
        if (valid) {
          this.$message.error("待开发");
        } else {
          return;
        }
      });
    },

    /**点击添加分类弹出层的 确定 */
    addConfirm() {
      this.$refs.addForm.validate(valid => {
        if (valid) {
          console.log(this.addForm);
          request.addCategories(this.addForm).then(res => {
            console.log(res);
            if (res.meta.status == 201) {
              this.$message({
                type: "success",
                message: "创建成功!"
              });
              this.addDialog = false;
              this.getCategoriesList();
            } else {
              this.$message.error(res.meta.msg);
            }
          });
        } else {
          return;
        }
      });
    },

    /**关闭修改分类弹出层 */
    closeClassifyDialog() {
      this.$refs.ClassifyForm.resetFields();
    },

    /**关闭添加分类弹出层 */
    closeAddDialog() {
      //   this.$message.error("待开发0");
      this.$refs.addForm.resetFields();
      this.cascaderValue = [];
      this.addForm.cat_pid = 0;
      this.addForm.cat_level = 0;
    },

    /**点击添加分类 */
    addCategories() {
      this.addDialog = true;
      this.getCategories();
    },

    /**改变每页条数 */
    handleSizeChange(val) {
      this.pageParams.pagesize = val;
      this.getCategoriesList();
    },

    /**改变当前页数 */
    handleCurrentChange(val) {
      this.pageParams.pagenum = val;
      this.getCategoriesList();
    }
  }
};
</script>
<style lang="less" scoped>
.el-breadcrumb {
  padding-bottom: 20px;
}

.zk-table {
  margin: 20px 0;
  overflow-y: scroll;
}

.el-icon-success {
  color: #409eff;
}

.el-icon-error {
  color: #f56c6c;
}

.el-cascader {
  width: 100%;
}
</style>