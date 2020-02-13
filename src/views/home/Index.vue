<template>
  <el-container>
    <el-header>
      <div class="logo">
        <div class="img"></div>
        <h1>电商后台管理系统</h1>
      </div>
      <el-button type="info" size="small" @click="loginout">退出</el-button>
    </el-header>
    <el-container>
      <el-aside width="200px">Aside</el-aside>
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>
<script>
import { Container, Header, Aside, Main, Button } from "element-ui";
export default {
  components: {
    "el-container": Container,
    "el-header": Header,
    "el-aside": Aside,
    "el-main": Main,
    "el-button": Button
  },

  methods:{
    loginout(){
      window.sessionStorage.clear();
      this.$router.push('/login')
    }
  }
};
</script>
<style lang="less" scoped>
.el-container {
  height: 100vh;
  min-width: 1024px;
}

.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .logo {
    display: flex;
    align-items: center;

    .img {
      width: 50px;
      height: 50px;
      background-image: url("../../assets/imgs/login/login.jpg");
      background-size: cover;
      background-position: center;
      border-radius: 50%;
    }

    h1 {
      font-size: 22px;
      color: #fff;
      margin-left: 10px;
    }
  }
}

.el-aside {
  background-color: #333744;
}

.el-main {
  background-color: #eaedf1;
}
</style>