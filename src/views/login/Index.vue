<template>
  <article>
    <div class="form-box">
      <div class="head-img">
        <div class="nest"></div>
      </div>
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="demo-ruleForm">
        <el-form-item prop="username">
          <el-input
            ref="username"
            prefix-icon="iconfont icon-iconyonghu"
            type="text"
            v-model="ruleForm.username"
            autocomplete="off"
            @keyup.enter.native="login"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            ref="password"
            prefix-icon="iconfont icon-mima"
            type="password"
            v-model="ruleForm.password"
            autocomplete="off"
            @keyup.enter.native="login"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            @click="login"
            class="login-button"
            type="primary"
            :loading="isLoading"
          >{{loginText}}</el-button>
        </el-form-item>
      </el-form>
    </div>
  </article>
</template>
<script>
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else {
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        username: "",
        password: ""
      },
      rules: {
        username: [{ validator: validatePass, trigger: "blur" }],
        password: [{ validator: validatePass2, trigger: "blur" }]
      },
      isLoading: false,
      loginText: "登录"
    };
  },

  methods: {
    /**
     * 点击登录
     */
    login() {
      if (this.ruleForm.username === "") {
        this.$refs.ruleForm.validateField("username");
        this.$refs.username.focus();
        return;
      } else if (this.ruleForm.password === "") {
        this.$refs.ruleForm.validateField("password");
        this.$refs.password.focus();
        return;
      }
      this.$refs.username.blur();
      this.$refs.password.blur();
      this.isLoading = true;
      this.loginText = "登录中";
      
      this.$http.post("/login", this.ruleForm).then(res => {
        console.log(res.data);
        this.isLoading = false;
        this.loginText = "登录";
        if (res.data.meta.status == 200) {
          console.log("登录成功");
          window.sessionStorage.setItem('token',res.data.data.token)
          this.$router.push('/home')
        } else {
          console.log("登录失败");
          this.$message.error("用户名或密码错误，请重新登录！");
          this.$refs.username.focus();
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
article {
  background-color: #2b4b6b;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.form-box {
  width: 450px;
  height: 304px;
  border-radius: 4px;
  background: #fff;
  position: relative;
  padding: 100px 50px 20px 50px;

  .head-img {
    width: 130px;
    height: 130px;
    position: absolute;
    left: 50%;
    top: -65px;
    transform: translate(-50%, 0);
    padding: 10px;
    box-sizing: border-box;
    border-radius: 50%;
    background-color: #fff;
    box-shadow: 0 0 10px #eee;

    .nest {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-image: url("../../assets/imgs/login/login.jpg");
      background-size: cover;
      background-position: center;
    }
  }

  .login-button {
    width: 88%;
    position: relative;
    left: 50%;
    transform: translate(-50%, 0);
  }
}
</style>