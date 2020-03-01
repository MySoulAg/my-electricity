<template>
  <article>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加商品</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card :style="{'max-height':tableMaxHeight+'px'}">
      <el-alert :closable="false" title="添加商品信息" type="info" center show-icon></el-alert>
      <!-- 步骤条 -->
      <el-steps :align-center="true" :active="active" finish-status="success">
        <el-step title="基本信息"></el-step>
        <el-step title="商品参数"></el-step>
        <el-step title="商品属性"></el-step>
        <el-step title="商品图片"></el-step>
        <el-step title="商品内容"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>
      <!-- 侧边栏tab -->
      <el-form :model="basicForm" :rules="basicRules" ref="basicFormRef" label-width="100px">
        <el-tabs
          tab-position="left"
          v-model="activeName"
          @tab-click="handleClick"
          :before-leave="changeTab"
        >
          <el-tab-pane label="基本信息" name="1">
            <el-form-item label="商品名称" prop="goodsName">
              <el-input v-model="basicForm.goodsName"></el-input>
            </el-form-item>
            <el-form-item label="商品价格" prop="goodsPrice">
              <el-input v-model="basicForm.goodsPrice"></el-input>
            </el-form-item>
            <el-form-item label="商品重量" prop="goodsWeight">
              <el-input v-model="basicForm.goodsWeight"></el-input>
            </el-form-item>
            <el-form-item label="商品数量" prop="goodsNum">
              <el-input v-model="basicForm.goodsNum"></el-input>
            </el-form-item>
            <el-form-item label="商品分类" prop="goodsClass">
              <el-cascader
                v-model="basicForm.goodsClass"
                :options="classOptions"
                :props="classProps"
                @change="handleChange"
              ></el-cascader>
            </el-form-item>
          </el-tab-pane>

          <el-tab-pane label="商品参数" name="2">
            <div v-for="item in goodsParamsList" :key="item.attr_id">
              <p class="p">{{item.attr_name}}</p>
              <el-checkbox-group v-model="item.attr_vals">
                <el-checkbox
                  border
                  :label="item2"
                  v-for="(item2,index2) in item.attr_vals"
                  :key="index2"
                ></el-checkbox>
              </el-checkbox-group>
            </div>
          </el-tab-pane>

          <el-tab-pane label="商品属性" name="3">
            <el-form-item :label="item.attr_name" v-for="item in goodsAttrList" :key="item.attr_id">
              <el-input v-model="item.attr_vals"></el-input>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品图片" name="4">
            <el-upload
              action="https://www.liulongbin.top:8888/api/private/v1/upload"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :on-success="uploadSuccess"
              list-type="picture"
              :headers="headersObj"
            >
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </el-tab-pane>
          <el-tab-pane label="商品内容" name="5">
            <quill-editor v-model="basicForm.goodsInfo"></quill-editor>
            <el-button @click="handleAddGoods" class="addButton" type="primary">添加商品</el-button>
          </el-tab-pane>
        </el-tabs>
      </el-form>
    </el-card>
    <!-- 图片预览弹窗 -->
    <el-dialog title="图片预览" :visible.sync="dialogVisible" width="50%">
      <img style="width:100%" :src="previewPath" alt />
    </el-dialog>
  </article>
</template>
<script>
import request from "@/api/goodsMgt/addGoods.js";
export default {
  data() {
    return {
      headersObj: {
        Authorization: window.sessionStorage.getItem("token")
      }, //上传图片时，设置请求头
      active: 0, //步骤条的默认值
      activeName: "1", //Tab默认选中项
      basicForm: {
        goodsName: "", //商品名称
        goodsPrice: "", //价格
        goodsWeight: "", //重量
        goodsNum: "", //数量
        goodsClass: [], //分类
        goodsPice: [], //图片数组
        goodsInfo: "" //商品内容
      }, //基本信息表单
      basicRules: {
        goodsName: [
          { required: true, message: "请输入商品名称", trigger: "blur" }
        ],
        goodsPrice: [
          { required: true, message: "请输入商品价格", trigger: "blur" }
        ],
        goodsWeight: [
          { required: true, message: "请输入商品重量", trigger: "blur" }
        ],
        goodsNum: [
          { required: true, message: "请输入商品数量", trigger: "blur" }
        ],
        goodsClass: [
          {
            required: true,
            message: "请选择商品分类(只能选择第三级分类)",
            trigger: "change"
          }
        ]
      }, //基本信息表单验证 
      classOptions: [], //商品分类级联选择器 预选值
      classProps: {
        expandTrigger: "hover",
        value: "cat_id",
        label: "cat_name",
        children: "children"
      }, //商品分类级联选择器 配置
      tableMaxHeight: 0, //表格的最大高度，根据浏览器的窗体大小而定
      threeId: "", //级联选择器 获取的最后以及的分类ID
      goodsParamsList: [], //商品参数列表
      goodsAttrList: [], //商品属性列表
      previewPath: "", //预览图片
      dialogVisible: false //是否显示图片预览弹窗
    };
  },

  created() {
    this.getGoodsClass();
    this.tableMaxHeight = window.innerHeight - 135; //表格的最大高度，根据浏览器的窗体大小而定
  },

  methods: {
    /**获取所有商品分类列表 */
    getGoodsClass() {
      request.getGoodsClass().then(res => {
        console.log(res);
        if (res.meta.status == 200) {
          this.classOptions = res.data;
        } else {
          this.$message.error(res.meta.msg);
        }
      });
    },

    /**点击添加商品 */
    handleAddGoods() {
      //处理动态参数
      const attrsArr = [];
      this.goodsParamsList.forEach(item => {
        const newInfo = {
          attr_id: item.attr_id,
          attr_value: item.attr_vals.join(" ")
        };
        attrsArr.push(newInfo);
      });
      //处理静态属性
      this.goodsAttrList.forEach(item => {
        const newInfo = {
          attr_id: item.attr_id,
          ttr_value: item.attr_vals
        };
        attrsArr.push(newInfo);
      });
      const params = {
        goods_name: this.basicForm.goodsName,
        goods_cat: this.basicForm.goodsClass.join(","),
        goods_price: this.basicForm.goodsPrice,
        goods_number: this.basicForm.goodsNum,
        goods_weight: this.basicForm.goodsWeight,
        goods_introduce: this.basicForm.goodsInfo,
        pics: this.basicForm.goodsPice,
        attrs: attrsArr
      };
      console.log(params, 666666);
      request.addGoods(params).then(res => {
        console.log(res);
        if (res.meta.status == 201) {
          this.$message({
            type: "success",
            message: "商品创建成"
          });
          this.$router.push("/goods");
        } else {
          this.$message.error(res.meta.msg);
        }
      });
    },

    /**商品分类级联选择器 改变值 */
    handleChange(value) {
      console.log(value);
      console.log(this.basicForm);
      if (value.length != 3) {
        this.basicForm.goodsClass = [];
        this.threeId = "";
      } else {
        this.threeId = value[value.length - 1];
      }
    },

    /**图片上传成功 */
    uploadSuccess(res) {
      console.log(res);
      const pinInfo = {
        pic: res.data.tmp_path
      };
      this.basicForm.goodsPice.push(pinInfo);
    },

    /**文件列表移除文件时的钩子 移除图片*/
    handleRemove(file, fileList) {
      console.log(file, fileList);
      const filePath = file.response.data.tmp_path;
      const i = this.basicForm.goodsPice.findIndex(x => x.pic === filePath);
      this.basicForm.goodsPrice.splice(i, 1);
    },

    /**点击文件列表中已上传的文件时的钩子 处理图片预览*/
    handlePreview(file) {
      console.log(file);
      this.previewPath = file.response.data.url;
      this.dialogVisible = true;
    },

    /** tab切换前*/
    changeTab(activeName) {
      console.log(activeName);
      return new Promise((resolve, reject) => {
        this.$refs.basicFormRef.validate(valid => {
          if (valid) {
            resolve();
            if (activeName == "1") {
              this.$message.error("基本信息");
              this.active = 0;
            } else if (activeName == "2") {
              this.$message.error("商品参数");
              this.active = 1;
              /**获取商品参数 {sel:'many'}   商品属性 {sel:'only'}*/
              request.getGoodsInfo(this.threeId, { sel: "many" }).then(res => {
                console.log(res);
                if (res.meta.status == 200) {
                  this.goodsParamsList = res.data;
                  this.goodsParamsList.forEach(item => {
                    if (item.attr_vals) {
                      item.attr_vals = item.attr_vals.split(" ");
                    } else {
                      item.attr_vals = [];
                    }
                  });
                } else {
                  this.$message.error(res.meta.msg);
                }
              });
            } else if (activeName == "3") {
              this.$message.error("商品属性");
              this.active = 2;
              /**获取商品参数 {sel:'many'}   商品属性 {sel:'only'}*/
              request.getGoodsInfo(this.threeId, { sel: "only" }).then(res => {
                console.log(res);
                if (res.meta.status == 200) {
                  this.goodsAttrList = res.data;
                  // this.goodsParamsList.forEach(item => {
                  //   if (item.attr_vals) {
                  //     item.attr_vals = item.attr_vals.split(" ");
                  //   } else {
                  //     item.attr_vals = [];
                  //   }
                  // });
                } else {
                  this.$message.error(res.meta.msg);
                }
              });
            } else if (activeName == "4") {
              this.$message.error("商品图片");
              this.active = 3;
            } else {
              this.$message.error("商品内容");
              this.active = 4;
            }
          } else {
            this.$message({
              type: "warning",
              message: "请完善商品基础信息"
            });
            reject();
          }
        });
      });
    },

    /**改变tab项后 */
    handleClick(tab, event) {
      console.log(tab, event);
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

.el-card {
  overflow-y: scroll;
}

.el-steps {
  margin: 10px auto 0;
}

/deep/ .el-step__title {
  font-size: 13px;
}

.el-tabs {
  margin-top: 10px;
}

.p {
  padding: 10px 0;
}

.el-checkbox {
  margin: 0;
}

/deep/ .ql-editor {
  min-height: 250px;
}

.addButton {
  margin-top: 20px;
}
</style>