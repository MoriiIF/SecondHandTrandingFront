<template>
  <div class="login">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      label-position="left"
      label-width="0px"
      class="login-form"
    >
      <h3 class="title">欢迎使用</h3>
      <el-form-item prop="username">
        <el-input
          v-model="loginForm.username"
          type="text"
          auto-complete="off"
          placeholder="账号">
          <i class="el-icon-user-solid" slot="prefix" name="user" scale="20" />
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model="loginForm.password"
          type="password"
          auto-complete="off"
          placeholder="密码"
          @keyup.enter.native="handleLogin">
          <i class="el-icon-key" slot="prefix" name="password" scale="20" />
        </el-input>
      </el-form-item>
      <el-radio-group v-model="radio">
        <el-radio :label="1">普通用户</el-radio>
        <el-radio :label="2">商家</el-radio>
        <el-radio :label="3">管理员</el-radio>
      </el-radio-group>
      <br><br>
      <el-checkbox v-model="loginForm.rememberMe" style="margin: 0 0 25px 0">
        记住我
      </el-checkbox>
      <el-form-item style="width: 100%">
        <el-button
          :loading="loading"
          size="medium"
          type="primary"
          style="width: 100%"
          @click="toLogin">
          <span v-if="!loading">登 录</span>
          <span v-else>登 录 中...</span>
        </el-button>
      </el-form-item>
      <el-form-item style="width: 100%">
        <a href="/register" class="register">注册</a>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {encrypt} from '@/utils/rsaEncrypt'
import Cookies from 'js-cookie'
export default{
  name: 'Login',
  data(){
    return {
      radio: 1,
      loginForm: {
        username: '',
        password: '',
        rememberMe: false,

      },
      loginRules: {
        username: [{
          required: true,
          message: '用户名不能为空',
          trigger: 'blur'
        }],
        password: [{
          required: true,
          message: '密码不能为空',
          trigger: 'blur'
        }]
      },
      loading: false,
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function(route){
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  created(){
    //获取用户名密码等Cookie
    this.getCookie()
    //token过期提示
    this.point()
  },
  methods: {
    getCookie(){
      const username = Cookies.get('username')
      let password = Cookies.get('password')
      const rememberMe = Cookies.get('rememberMe')
      //保存cookie中加密后的密码
      this.cookiePass = password === undefined ? '' : password
      password = password === undefined ? this.loginForm.password : password
      this.loginForm = {
        username: username === undefined ? this.loginForm.username : username,
        password: password,
        rememberMe: rememberMe === undefined ? false : Boolean(rememberMe),

      }
    },
    handleLogin(){
      this.$refs.loginForm.validate((valid) => {
        const user = {
          username: this.loginForm.username,
          password: this.loginForm.password,
          rememberMe: this.loginForm.rememberMe
        }
        if(user.password !== this.cookiePass){
          user.password = encrypt(user.password)
        }
        if(valid){
          this.loading = true
          if(user.rememberMe){
            Cookies.set('username', user.username, {
              expires: Config.passCookieExpires
            })
            Cookies.set('password', user.password, {
              expires: Config.passCookieExpires
            })
            Cookies.set('rememberMe', user.rememberMe, {
              expires: Config.passCookieExpires
            })
          } else {
            Cookies.remove('username')
            Cookies.remove('password')
            Cookies.remove('rememberMe')
          }
          //模拟登录成功
          console.log('登录成功')
        } else {
          console.log('error submit')
          return false
        }
      })
    },
    toLogin() {
      // setTimeout(this.$router.push('/login'), 3000)
      //this.$router.push('/');
      var url = 'http://49.232.81.174:8080/users/login';
      var _this = this;
      _this.axios.get(url, {
        params: {
          'userId': _this.loginForm.username,
          'password': _this.loginForm.password
        }
      }).then(function(res){
        console.log(res)
        if(res.data.data == 'success.'){
          localStorage.setItem('userId', _this.loginForm.username);
          _this.loginForm.username = res.data.data.userId;
          _this.$router.push('/');
        }else {
          console.log(res.data.data)
        }
      })
    },
    toLogin: function() {
      // setTimeout(this.$router.push('/login'), 3000)
      //this.$router.push('/');
      var url = 'http://49.232.81.174:8080/users/login'
      this.$http.get(url, {params: {
        userId: this.loginForm.username,
        password: this.loginForm.password
      }}).then(result => {
        if (result.data['data'] == 'success.') {
          localStorage.setItem('userId', this.loginForm.username)
          this.$router.push('/')
        } else {
          console.log(result.data['data'])
        }
      }
      )
    },
    point(){
      const point = Cookies.get('point') !== undefined
      if(point){
        this.$notify({
          title: '提示',
          message: '当前登录状态已过期，请重新登录！',
          type: 'warning',
          duration: 5000
        })
        Cookies.remove('point')
      }
    }
  }

}
</script>

<style lang="scss" scoped>

.login{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-size: cover;
}
.title{
  margin: 0 auto 30px auto;
  text-align: center;
  color: #707070;
}
.login-form{
  border-radius: 6px;
  background: #ffffff;
  width: 385px;
  padding: 25px 25px 5px 25px;
  .el-input{
    height: 38px;
    input{
      height: 38px;
    }
  }
  .input-icon{
    height: 39px;
    width: 14px;
    margin-left: 2px;
  }
}
.login-tip{
  font-size: 13px;
  text-align: center;
  color: #bfbfbf;
}
.register{
  float: right;
  color: #1890ff;
}
a{
  color: #1890ff;
  text-decoration: none;
  background-color: transparent;
  outline: none;
  cursor: pointer;
  transition: color 0.3s;
}
</style>
