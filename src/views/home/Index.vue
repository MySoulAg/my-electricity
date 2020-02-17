<template>
  <el-container>
    <el-header>
      <div class="logo" @click="goHome">
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
          :default-active="defaultActive"
          class="el-menu-vertical-demo"
          background-color="#333744"
          text-color="#fff"
          active-text-color="#409EFF"
          :collapse="isCollapse"
          :unique-opened="true"
          :router="true"
          @select="selectMenu"
          @open="openMenu"
          ref="menuRef"
        >
          <el-submenu :index="item.id+''" v-for="item in menuList" :key="item.id">
            <template slot="title">
              <i :class="asideIcon(item.id)"></i>
              <span>{{item.authName}}</span>
            </template>

            <el-menu-item-group>
              <el-menu-item :index="'/'+item1.path" v-for="item1 in item.children" :key="item1.id">
                <i class="iconfont icon-ca-xuexizhongxin-xiaofangkuai"></i>
                <span>{{item1.authName}}</span>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>

      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
export default {
  data() {
    return {
      defaultActive: "", //当前激活菜单
      isCollapse: false, //是否折叠侧边栏
      menuList: [] //侧边栏数据
    };
  },

  created() {
    this.defaultActive = window.sessionStorage.getItem("selectMenu");
    this.getMenuList();
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
    },

    /**
     * 获取侧边栏数据列表
     */
    getMenuList() {
      this.$http.get("/menus").then(res => {
        if (res.data.meta.status == 200) {
          this.menuList = res.data.data;
        } else {
          this.$message.error(res.data.meta.msg);
        }
      });
    },

    /**
     * 点击logo
     */
    goHome() {
      this.$router.push("/home");
      window.sessionStorage.removeItem("selectMenu");
      this.defaultActive = "";
      this.$refs.menuRef.close(window.sessionStorage.getItem("openMenu") + "");
    },

    /**
     * 侧边栏图标
     */
    asideIcon(id) {
      let obj = {
        125: "iconfont icon-yonghu",
        103: "iconfont icon-guanliyuan",
        101: "iconfont icon-shangpin",
        102: "iconfont icon-dingdan",
        145: "iconfont icon-tongji"
      };
      return obj[id];
    },

    /**
     * 选择的哪个菜单
     */
    selectMenu(index) {
      window.sessionStorage.setItem("selectMenu", index);
      this.defaultActive = index;
    },

    /**
     * 展开的哪个sub-menu
     */
    openMenu(index) {
      window.sessionStorage.setItem("openMenu", index);
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
    cursor: pointer;

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
    cursor: pointer;

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

.iconfont {
  margin-right: 5px;
}
</style>