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
          <el-button :disabled="isDisabled1" size="mini" type="primary" @click="addParam">添加参数</el-button>
          <!-- 参数表格 -->
          <el-table stripe border :data="tableData1" style="width: 100%" :max-height="tableMaxHeight">
            <el-table-column align="center" type="expand">
              <template slot-scope="scope">
                <el-tag
                  closable
                  v-for="(item,index) in scope.row.attr_vals"
                  :key="index"
                  @close="handleClose(scope.row,index)"
                >{{item}}</el-tag>
                <el-input
                  class="input-new-tag"
                  v-if="scope.row.inputVisible"
                  v-model="scope.row.inputValue"
                  ref="saveTagInput"
                  size="small"
                  @keyup.enter.native="handleInputConfirm(scope.row)"
                  @blur="handleInputConfirm(scope.row)"
                ></el-input>
                <el-button
                  v-else
                  class="button-new-tag"
                  size="small"
                  @click="showInput(scope.row)"
                >+ New Tag</el-button>
              </template>
            </el-table-column>
            <el-table-column align="center" type="index" :index="1" label="#"></el-table-column>
            <el-table-column align="center" prop="attr_name" label="参数名称"></el-table-column>
            <el-table-column align="center" label="操作">
              <template slot-scope="scope">
                <el-button
                  @click="handleEdit(scope.row)"
                  type="primary"
                  icon="el-icon-edit"
                  size="mini"
                >修改</el-button>
                <el-button
                  @click="handleDelete(scope.row)"
                  type="danger"
                  icon="el-icon-delete"
                  size="mini"
                >删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="静态属性" name="only">
          <el-button :disabled="isDisabled2" size="mini" type="primary" @click="addAttribute">添加属性</el-button>
          <!-- 属性表格 -->
          <el-table stripe border :data="tableData2" style="width: 100%" :max-height="tableMaxHeight">
            <el-table-column align="center" type="expand">
              <template slot-scope="scope">
                <el-tag
                  closable
                  v-for="(item,index) in scope.row.attr_vals"
                  :key="index"
                  @close="handleClose(scope.row,index)"
                >{{item}}</el-tag>
                <el-input
                  class="input-new-tag"
                  v-if="scope.row.inputVisible"
                  v-model="scope.row.inputValue"
                  ref="saveTagInput"
                  size="small"
                  @keyup.enter.native="handleInputConfirm(scope.row)"
                  @blur="handleInputConfirm(scope.row)"
                ></el-input>
                <el-button
                  v-else
                  class="button-new-tag"
                  size="small"
                  @click="showInput(scope.row)"
                >+ New Tag</el-button>
              </template>
            </el-table-column>
            <el-table-column align="center" type="index" :index="1" label="#"></el-table-column>
            <el-table-column align="center" prop="attr_name" label="属性名称"></el-table-column>
            <el-table-column align="center" label="操作">
              <template slot-scope="scope">
                <el-button
                  @click="handleEdit(scope.row)"
                  type="primary"
                  icon="el-icon-edit"
                  size="mini"
                >修改</el-button>
                <el-button
                  @click="handleDelete(scope.row)"
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

    <!-- 添加分类弹出层 -->
    <el-dialog
      :title="isDongTai?'添加动态参数':'添加静态属性'"
      :visible.sync="addDialog"
      @open="closeAddDialog"
    >
      <el-form
        :model="addForm"
        :rules="isDongTai?addRules1:addRules2"
        ref="addForm"
        label-width="100px"
      >
        <el-form-item :label="isDongTai?'动态参数':'静态属性'" prop="attr_name">
          <el-input v-model="addForm.attr_name"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addDialog = false">取 消</el-button>
        <el-button type="primary" @click="addConfirm">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 修改分类弹出层 -->
    <el-dialog
      :title="isDongTai?'修改动态参数':'修改静态属性'"
      :visible.sync="editorDialog"
      @open="closeEditorDialog"
    >
      <el-form
        :model="editorForm"
        :rules="isDongTai?editorRules1:editorRules2"
        ref="editorForm"
        label-width="100px"
      >
        <el-form-item :label="isDongTai?'动态参数':'静态属性'" prop="attr_name">
          <el-input v-model="editorForm.attr_name"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editorDialog = false">取 消</el-button>
        <el-button type="primary" @click="editorConfirm">确 定</el-button>
      </div>
    </el-dialog>
  </article>
</template>
<script>
import request from "@/api/goodsMgt/params.js";
export default {
  data() {
    return {
      dialogTitle: "添加动态参数", //弹框的标题
      isDongTai: true, //tab是否处于动态参数项
      addDialog: false, //是否显示添加弹窗
      editorDialog: false, //是否显示修改弹框
      tableMaxHeight: 0, //表格的最大高度，根据浏览器的窗体大小而定
      addForm: {
        attr_name: "" //参数名称
      },
      editorForm: {
        attr_name: "" //参数名称
      },
      addRules1: {
        attr_name: [
          { required: true, message: "请输入动态参数", trigger: "blur" }
        ]
      },
      editorRules1: {
        attr_name: [
          { required: true, message: "请输入动态参数", trigger: "blur" }
        ]
      },
      addRules2: {
        attr_name: [
          { required: true, message: "请输入静态属性", trigger: "blur" }
        ]
      },
      editorRules2: {
        attr_name: [
          { required: true, message: "请输入静态属性", trigger: "blur" }
        ]
      },

      cascaderValue: [], //级联选择框选中的值
      threeId: "", //级联选择框选中值的 第三级ID
      attr_id: "",
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
    console.log(window.innerHeight)
    this.tableMaxHeight = window.innerHeight - 360; //表格的最大高度，根据浏览器的窗体大小而定
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

    /**点击添加弹出层的 确定 */
    addConfirm() {
      this.$refs.addForm.validate(valid => {
        if (valid) {
          request
            .addAttributes(this.threeId, {
              attr_name: this.addForm.attr_name,
              attr_sel: this.sel
            })
            .then(res => {
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

    /**点击修改弹出层的 确定 */
    editorConfirm() {
      this.$refs.editorForm.validate(valid => {
        if (valid) {
          request
            .editorAttributes(this.threeId, this.attr_id, {
              attr_name: this.editorForm.attr_name,
              attr_sel: this.sel
            })
            .then(res => {
              console.log(res);
              if (res.meta.status == 200) {
                this.$message({
                  type: "success",
                  message: "修改成功!"
                });
                this.editorDialog = false;
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

    /**删除tag */
    handleClose(row, index) {
      let temTag = row.attr_vals.splice(index, 1);
      request
        .editorTag(this.threeId, row.attr_id, {
          attr_name: row.attr_name,
          attr_sel: this.sel,
          attr_vals: row.attr_vals.join(" ")
        })
        .then(res => {
          if (res.meta.status == 200) {
            this.$message({
              type: "success",
              message: "删除成功!"
            });
          } else {
            row.attr_vals.splice(index, 0, temTag[0]);
            this.$message.error(res.meta.msg);
          }
        });
    },

    /**tag输入框失焦或enter时 */
    handleInputConfirm(row) {
      let inputValue = row.inputValue;
      if (inputValue) {
        row.attr_vals.push(inputValue);
        request
          .editorTag(this.threeId, row.attr_id, {
            attr_name: row.attr_name,
            attr_sel: this.sel,
            attr_vals: row.attr_vals.join(" ")
          })
          .then(res => {
            if (res.meta.status == 200) {
              this.$message({
                type: "success",
                message: "添加成功!"
              });
            } else {
              row.attr_vals.pop();
              this.$message.error(res.meta.msg);
            }
          });
        // row.attr_vals.push(inputValue);
      }
      row.inputVisible = false;
      row.inputValue = "";
    },

    /**点击添加tag */
    showInput(row) {
      row.inputVisible = true;
      this.$nextTick(() => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    /**关闭添加分类弹出层 */
    closeAddDialog() {
      if (this.$refs.addForm) {
        this.$refs.addForm.resetFields();
      }
    },

    /**关闭修改分类弹出层 */
    closeEditorDialog() {
      if (this.$refs.editorForm) {
        this.$refs.editorForm.resetFields();
      }
    },

    /**点击添加属性 */
    addAttribute() {
      this.addDialog = true;
    },

    /**点击添加参数 */
    addParam() {
      this.addDialog = true;
    },

    /**添加分类的下拉框改变选择时 */
    handleChange(value) {
      console.log(value);
      if (value.length != 3) {
        this.isDisabled1 = true;
        this.isDisabled2 = true;
        this.cascaderValue = [];
        this.threeId = "";
        this.tableData1 = [];
        this.tableData2 = [];
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
          res.data.forEach(element => {
            element.attr_vals = element.attr_vals
              ? this.handleTag(element.attr_vals)
              : [];
            element.inputVisible = false;
            element.inputValue = "";
          });
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
      this.isDongTai = !this.isDongTai;
      this.sel = tab.name;
      if (this.cascaderValue.length != 0) {
        this.getCategoriesList();
      }
    },

    /**
     * 点击操作栏 的编辑
     */
    handleEdit(row) {
      this.editorDialog = true;
      this.attr_id = row.attr_id;

      this.$nextTick(() => {
        this.editorForm.attr_name = row.attr_name;
      });
      this.editorForm.attr_name = "";
    },

    /**表格展开的tag标签处理 字符串 转 数组*/
    handleTag(tag) {
      return tag.split(" ");
    },

    /**
     * 点击操作栏 的删除
     */
    handleDelete(row) {
      this.$confirm("此操作将永久删除该参数, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          request.deleteAttributes(this.threeId, row.attr_id).then(res => {
            console.log(res);
            if (res.meta.status == 200) {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              this.getCategoriesList();
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

.select {
  padding: 10px 0 0 0;
}

.el-table {
  margin-top: 15px;
}

.el-tag {
  margin-left: 10px;
}

.el-tag:first-of-type {
  margin-left: 0;
}

.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}

.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
</style>