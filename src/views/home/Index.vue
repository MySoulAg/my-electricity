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
      <el-aside width="auto">
        <div class="switch" @click="cllapseFun">
          <i :class="isCollapse?'el-icon-s-unfold':'el-icon-s-fold'"></i>
        </div>
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color="#333744"
          text-color="#fff"
          active-text-color="#ffd04b"
          :collapse="isCollapse"
        >
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>导航一</span>
            </template>
            <el-menu-item-group>
              <template slot="title">分组一</template>
              <el-menu-item index="1-1">选项1</el-menu-item>
              <el-menu-item index="1-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
              <el-menu-item index="1-3">选项3</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="1-4">
              <template slot="title">选项4</template>
              <el-menu-item index="1-4-1">选项1</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-menu-item index="2">
            <i class="el-icon-menu"></i>
            <span slot="title">导航二</span>
          </el-menu-item>
          <el-menu-item index="3" disabled>
            <i class="el-icon-document"></i>
            <span slot="title">导航三</span>
          </el-menu-item>
          <el-menu-item index="4">
            <i class="el-icon-setting"></i>
            <span slot="title">导航四</span>
          </el-menu-item>
        </el-menu>
      </el-aside>

      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>
<script>
export default {
  data() {
    return {
      isCollapse: false //是否折叠侧边栏
    };
  },

  methods: {
    /**
     * 点击退出
     */
    loginout() {
      window.sessionStorage.clear();
      this.$router.push("/login");
    },

    /**
     * 点击侧边栏 展开/收起 图标
     */
    cllapseFun() {
      this.isCollapse = !this.isCollapse;
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

  .switch {
    width: 100%;
    height: 25px;
    background-color: #4a5064;
    display: flex;
    justify-content: center;
    align-items: center;
    

    i {
      color: #fff;
      font-size: 22px;
    }
  }

  .el-menu {
    border: 0;
  }
}

.el-main {
  background-color: #eaedf1;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>