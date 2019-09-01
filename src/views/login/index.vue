<template>
  <div class="login">
    <el-card class="login-card">
      <div class="logo">
        <img src="../../assets/img/logo_index.png" />
      </div>
      <el-form ref="loginForm" :model="loginForm" :rules="loginRules" style="margin-top :20px">
        <el-form-item prop="mobile">
          <el-input v-model="loginForm.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>

        <el-form-item prop="code">
          <el-input v-model="loginForm.code" placeholder="请输入验证码" style="width:280px"></el-input>
          <el-button style="float:right">发送验证码</el-button>
        </el-form-item>

        <el-form-item prop="check">
          <el-checkbox v-model="loginForm.check">我已阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button @click="login" type="primary" style="width:100%">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
// import { constants } from "crypto";
export default {
  data () {
    let validator = function (rule, value, callBack) {
      if (value) {
        callBack() // 如果value为true直接通过
      } else {
        callBack(new Error('您必须无条件同意被坑'))
      }
    }
    return {
      loginForm: {
        mobile: '',
        code: '',
        check: false
      },
      loginRules: {
        mobile: [
          {
            // required只校验空字符串null  '' undefined ,不校验false和true
            required: true,
            message: '手机号不能为空'
          },
          {
            pattern: /^1[3456789]\d{9}$/,
            message: '手机号格式不正确'
          }
        ],
        code: [
          {
            required: true,
            message: '验证码不能为空'
          },
          {
            pattern: /^\d{6}$/,
            message: '验证码必须为6位数字'
          }
        ],
        check: [
          {
            validator: validator
          }
        ]
      }
    }
  },
  methods: {
    login () {
      this.$refs.loginForm.validate(isOk => {
        if (isOk) {
          this.$axios({
            url: '/authorizations',
            // axios 中 data中放置body参数 params是放置地址参数的
            method: 'post',
            data: this.loginForm
          })
            .then(result => {
              // console.log(result);
              // setItem ( '名称'  ,   '值')
              window.localStorage.setItem('user-token', result.data.data.token)
              this.$router.push('/')
            })
            .catch(() => {
              this.$message({
                message: '手机号或者验证码错误',
                type: 'warning'
              })
            })
        }
      })
    }
  }
}
</script>

<style lang='less' scoped>
.login {
  background: url("../../assets/img/login_bg.jpg");
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  .login-card {
    width: 450px;
    height: 340px;
    .logo {
      text-align: center;
      img {
        height: 45px;
      }
    }
  }
}
</style>
