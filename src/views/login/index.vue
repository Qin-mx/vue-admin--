<template>
    <div class="login-contaier">
        <el-form ref="loginForm" :model="loginForm" :rules="rules" class="login-form">
            <h3>{{context}}</h3>
            <!-- 用户名 -->
            <el-form-item label="用户名" prop="username">
                <el-input type="text" v-model="loginForm.username" auto-complete="off"></el-input>
            </el-form-item>
            <!-- 密码 -->
            <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="loginForm.password" auto-complete="off" @keyup.enter.native="handleLogin"></el-input>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" :loading="loading" @click.native.prevent="handleLogin">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import { isvalidUsername } from '@/utils/validate'
    export default {
      name: 'login',
      data() {
        const validateUsername = (rule, value, callback) => {
          if (!isvalidUsername(value)) {
            callback(new Error('请输入正确的用户名'))
          } else {
            callback()
          }
        }
        const validatePassword = (rule, value, callback) => {
          if (value.length < 6) {
            callback(new Error('密码长度不能小于6位数'))
          } else {
            callback()
          }
        }
        return {
          context: '后台登录系统',
          loading: false,
          loginForm: {
            username: '',
            password: ''
          },
          rules: {
            username: [{
              required: true,
              trigger: 'blur',
              validator: validateUsername
            }],
            password: [{
              required: true,
              trigger: 'blur',
              validator: validatePassword
            }]
          }
        }
      },
      methods: {
        handleLogin() {
          this.$refs.loginForm.validate((valid) => {
            if (valid) {
              this.loading = true
              this.$store.dispatch('LoginByUsername', this.loginForm)
                .then(res => {
                  console.log(res)
                  this.loading = false
                  this.$router.push({ path: '/' })
                })
            } else {
              console.log('登录失败！')
              return false
            }
          })
        }
      }
    }
</script>

<style lang="scss" scoped>
$bgcolor: #2d3a4b;
.login-contaier{
  width: 100%;
  height: 100%;
  background-color:$bgcolor;
  background-size:cover;
  position: relative;
  .login-form{
    position: absolute;
    left: 0;
    right: 0;
    width: 450px;
    padding: 25px 55px 45px;
    margin: 0 auto;
    background: #fff;
    border-radius: 3px;
    top: 50%;
    transform: translateY(-50%);
  }
}
</style>
