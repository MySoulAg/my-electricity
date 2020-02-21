<template>
  <article>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加商品</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <el-alert :closable="false" title="消息提示的文案" type="info" center show-icon></el-alert>
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
      <el-tabs tab-position="left" style="height: 200px;">
        <el-tab-pane label="基本信息">基本信息</el-tab-pane>
        <el-tab-pane label="商品参数">商品参数</el-tab-pane>
        <el-tab-pane label="商品属性">商品属性</el-tab-pane>
        <el-tab-pane label="商品图片">商品图片</el-tab-pane>
        <el-tab-pane label="商品内容">商品内容</el-tab-pane>
      </el-tabs>
    </el-card>
  </article>
</template>
<script>
export default {
  data() {
    return {
      active: 0 //步骤条的默认值
    };
  }
};
</script>
<style lang="less" scoped>
.el-breadcrumb {
  padding-bottom: 20px;
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
</style>