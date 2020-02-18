<template>
  <article>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <!-- 搜索部分 -->
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input
            clearable
            @clear="getUsreInfoList"
            @keyup.enter.native="search"
            placeholder="请输入搜索内容"
            v-model="params.query"
          >
            <el-button @click="search" slot="append" :icon="searchObj.icon">{{searchObj.text}}</el-button>
          </el-input>
        </el-col>
        <el-col :span="3">
          <el-button type="primary" @click="addUser">添加用户</el-button>
        </el-col>
      </el-row>
      <!-- 表格 -->
      <el-table stripe border :data="tableData" style="width: 100%" :max-height="tableMaxHeight">
        <el-table-column align="center" type="index" :index="1" label="#"></el-table-column>
        <el-table-column align="center" prop="username" label="姓名"></el-table-column>
        <el-table-column align="center" prop="email" label="邮箱"></el-table-column>
        <el-table-column align="center" prop="mobile" label="电话"></el-table-column>
        <el-table-column align="center" prop="role_name" label="角色"></el-table-column>
        <el-table-column align="center" label="状态" width="100">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.mg_state"
              @change="handleSwitch(scope.row)"
              active-color="#409EFF"
              inactive-color="#DCDFE6"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button
              @click="handleEdit(scope.row)"
              type="primary"
              icon="el-icon-edit"
              size="mini"
            ></el-button>
            <el-button
              @click="handleDelete(scope.row)"
              type="danger"
              icon="el-icon-delete"
              size="mini"
            ></el-button>
            <el-tooltip effect="dark" content="分配角色" placement="top">
              <el-button type="warning" icon="el-icon-setting" size="mini" @click="handleRole"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="params.pagenum"
        :page-sizes="[2, 5, 10, 20]"
        :page-size="params.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>

    <!-- 修改用户信息弹出层 -->
    <el-dialog title="修改用户信息" :visible.sync="dialogFormVisible" @closed="closeEditorUserInfoDialog">
      <el-form :model="userInfo" :rules="rules" ref="userInfoForm">
        <el-form-item label="用户名" label-width="80px">
          <el-input disabled v-model="userInfo.username"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" label-width="80px" prop="email">
          <el-input v-model="userInfo.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" label-width="80px" prop="mobile">
          <el-input v-model="userInfo.mobile"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="editorConfirm">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 添加用户弹出层 -->
    <el-dialog title="添加用户" :visible.sync="dialogFormAdd" @closed="closeAddUserInfoDialog">
      <el-form :model="addUserInfo" :rules="addUserRules" ref="addUserInfoForm">
        <el-form-item label="用户名" label-width="80px" prop="username">
          <el-input v-model="addUserInfo.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="80px" prop="password">
          <el-input v-model="addUserInfo.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" label-width="80px" prop="email">
          <el-input v-model="addUserInfo.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" label-width="80px" prop="mobile">
          <el-input v-model="addUserInfo.mobile"></el-input>
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
import request from "@/api/users/index.js";
import check from "@/utils/check.js";
export default {
  data() {
    //校验邮箱的自定义规则 （必填）
    var checkEmail = (rule, value, callback) => {
      if (check.isEmail(value)) {
        callback();
      } else {
        callback(new Error("请输入正确的电子邮箱"));
      }
    };
    //校验邮箱的自定义规则 （非必填）
    var checkEmailNo = (rule, value, callback) => {
      if (value) {
        if (check.isEmail(value)) {
          callback();
        } else {
          callback(new Error("请输入正确的电子邮箱"));
        }
      } else {
        callback();
      }
    };
    //校验手机号的自定义规则 （必填）
    var checkMobile = (rule, value, callback) => {
      if (check.isMobile(value)) {
        callback();
      } else {
        callback(new Error("请输入正确的手机号码"));
      }
    };
    //校验手机号的自定义规则 （非必填）
    var checkMobileNo = (rule, value, callback) => {
      if (value) {
        if (check.isMobile(value)) {
          callback();
        } else {
          callback(new Error("请输入正确的手机号码"));
        }
      } else {
        callback();
      }
    };
    return {
      searchObj: {
        icon: "el-icon-search",
        text: "搜索"
      },
      params: {
        query: "", //搜索内容
        pagenum: 1, //当前页码
        pagesize: 5 //每页显示条数
      },
      tableData: [], //用户列表数据
      dialogFormVisible: false, //是否显示 修改用户信息弹出层
      dialogFormAdd: false, //是否显示 添加用户弹出层

      userInfo: {
        id: "", //用户ID
        username: "", //用户名
        email: "", //邮箱
        mobile: "" //手机
      }, //修改用户信息表单

      addUserInfo: {
        username: "", //用户名
        password: "", //密码
        email: "", //邮箱
        mobile: "" //手机号
      }, //添加用户 表单

      rules: {
        email: [
          { required: true, message: "请输入邮箱地址", trigger: "blur" },
          { validator: checkEmail, trigger: "blur" }
        ],
        mobile: [
          { required: true, message: "请输入手机号码", trigger: "blur" },
          { validator: checkMobile, trigger: "blur" }
        ]
      }, //修改用户信息 的验证规则
      addUserRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        email: [{ validator: checkEmailNo, trigger: "blur" }],
        mobile: [{ validator: checkMobileNo, trigger: "blur" }]
      }, //添加用户 的验证规则
      tableMaxHeight: 0, //表格的最大高度，根据浏览器的窗体大小而定
      total: 0 //总页数
    };
  },

  created() {
    this.getUsreInfoList();
    this.tableMaxHeight = window.innerHeight - 290; //表格的最大高度，根据浏览器的窗体大小而定
  },

  methods: {
    /**
     * 获取用户列表数据
     */
    async getUsreInfoList() {
      await request.getUsreInfoList(this.params).then(res => {
        if (res.meta.status == 200) {
          this.tableData = res.data.users;
          this.total = res.data.total;
        } else {
          this.$message.error(res.meta.msg);
        }
      });
    },

    /**
     * 点击操作栏的 分配角色
     */
    handleRole() {
      this.$message.error("待开发");
    },

    /**
     * 点击 添加用户
     */
    addUser() {
      this.dialogFormAdd = true;
    },

    /**
     * 添加用户的弹出层关闭时调用
     */
    closeAddUserInfoDialog() {
      this.$refs.addUserInfoForm.resetFields();
    },

    /**
     * 修改用户信息的弹出层关闭时调用
     */
    closeEditorUserInfoDialog() {
      this.$refs.userInfoForm.resetFields();
    },

    /**
     * 点击操作栏 的删除
     */
    handleDelete(row) {
      this.$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          request.deleteUser(row.id).then(res => {
            console.log(res);
            if (res.meta.status == 200) {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              this.getUsreInfoList();
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
    },

    /**
     * 点击添加用户弹出层的 确认
     */
    addConfirm() {
      this.$refs.addUserInfoForm.validate(valid => {
        if (valid) {
          //预校验成功 能够提交
          request.addUser(this.addUserInfo).then(res => {
            console.log(res);
            if (res.meta.status == 201) {
              this.$message({
                message: "添加用户成功",
                type: "success"
              });
              this.dialogFormAdd = false;
              this.getUsreInfoList();
              this.$refs.addUserInfoForm.resetFields(); //表单重置
            } else {
              this.$message.error(res.meta.msg);
            }
          });
        } else {
          //预校验失败

          return false;
        }
      });
    },

    /**
     * 点击修改用户信息弹出层的 确认
     */
    editorConfirm() {
      this.$refs.userInfoForm.validate(valid => {
        if (valid) {
          //预校验成功 能够提交
          request
            .editorUser(this.userInfo.id, {
              email: this.userInfo.email,
              mobile: this.userInfo.mobile
            })
            .then(res => {
              if (res.meta.status == 200) {
                this.$message({
                  message: "用户信息修改成功",
                  type: "success"
                });
                this.dialogFormVisible = false;
                this.getUsreInfoList();
              } else {
                this.$message.error(res.meta.msg);
              }
            });
        } else {
          //预校验失败

          return false;
        }
      });
    },

    /**
     * 点击搜索
     */
    search() {
      (this.searchObj.icon = "el-icon-loading"),
        (this.searchObj.text = "搜索中");

      this.getUsreInfoList().then(() => {
        (this.searchObj.icon = "el-icon-search"),
          (this.searchObj.text = "搜索");
      });
    },

    /**
     * 点击编辑
     */
    handleEdit(row) {
      this.dialogFormVisible = true;
      const { id, username, email, mobile } = row;
      this.userInfo.id = id;
      this.userInfo.username = username;
      this.userInfo.email = email;
      this.userInfo.mobile = mobile;
    },

    /**
     * 改变状态
     */
    handleSwitch(row) {
      request.changeType(row).then(res => {
        if (res.meta.status == 200) {
          this.$message({
            message: "设置成功",
            type: "success"
          });
        } else {
          this.$message.error(res.meta.msg);
        }
      });
    },

    /**
     * 改变每页条数
     */
    handleSizeChange(val) {
      this.params.pagesize = val;
      this.getUsreInfoList();
    },

    /**
     * 改变当前页数
     */
    handleCurrentChange(val) {
      this.params.pagenum = val;
      this.getUsreInfoList();
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

.el-pagination {
  margin-top: 20px;
}
</style>