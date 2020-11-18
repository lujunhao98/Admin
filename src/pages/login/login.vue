<template>
  <div class="wrap">
    <div class="login">
      <h2>登录</h2>
      <div class="User">
        <el-input v-model="user.username" placeholder="请输入账户"></el-input>
      </div>
      <div class="User">
        <el-input v-model="user.password" placeholder="请输入密码" show-password></el-input>
      </div>
      <div class="loginbtn">
        <el-button type="primary" @click="login">登录</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import{mapGetters,mapActions}from 'vuex'
import { successAlert } from "../../ustil/alert";
import { reqlogin } from "../../ustil/https";
export default {
  data() {
    return {
      user: {
        username: "",
        password: "",
      },
    };
  },
  computed: {
    ...mapGetters({})
  },
  methods: {
      ...mapActions({
      "changeUser":"changeUser"
    }),
    login() {
      reqlogin(this.user).then((res) => {
        if (res.data.code === 200) {
          successAlert('登录成功');

          //存入Vuex
          this.changeUser(res.data.list)
          //跳页面
          this.$router.push('/')
        }
      });
    },
  },
}
</script>

<style scoped>
.wrap {
  width: 100vw;
  height: 100vh;
  position: relative;
  background: rgba(0, 0, 0, 0.5);
}
.login {
  width: 400px;
  padding: 20px;
  border-radius: 10px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
}
h2 {
  color: skyblue;
  text-align: center;
}
.User {
  margin: 20px;
  padding: 0 30px;
}
.loginbtn {
  text-align: center;
}
</style>