<template>
    <div class="login-contaier">
       
        <el-form ref="loginForm" :model="loginForm" :rules="rules" class="login-form">
            <h3>{{$t('logins.title')}}</h3>
            <set-language class="set-language"></set-language>
            <!-- 用户名 -->
            <el-form-item :label="$t('logins.userName')" prop="username">
                <el-input type="text" v-model="loginForm.username" auto-complete="off"></el-input>
            </el-form-item>
            <!-- 密码 -->
            <el-form-item :label="$t('logins.password')" prop="password">
                <el-input type="password" v-model="loginForm.password" auto-complete="off" @keyup.enter.native="handleLogin"></el-input>
            </el-form-item>

            <el-form-item >
                <p style="margin:0">{{$t('logins.tip')}}</p>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" :loading="loading" @click.native.prevent="handleLogin" class="loginWidth">{{$t('logins.login')}}</el-button>
            </el-form-item>
        </el-form>

         
    </div>
</template>

<script>
    import { isvalidUsername } from '@/utils/validate'
    import SetLanguage from '@/components/LangSelect'
    export default {
      name: 'login',
      components: {
        SetLanguage
      },
      data() {
        const validateUsername = (rule, value, callback) => {
          if (!isvalidUsername(value)) {
            callback(new Error(this.$t('logins.ErrorTips')))
          } else {
            callback()
          }
        }
        const validatePassword = (rule, value, callback) => {
          if (value.length < 6) {
            callback(new Error(this.$t('logins.ErrorPassword')))
          } else {
            callback()
          }
        }
        return {
          // context: `<div>` + this.$t('login.title') + `</div>`,
          loading: false,
          loginForm: {
            username: 'admin',
            password: '123456'
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
  .set-language{
    position: absolute;
    right: 30px;
    top: 30px;
  }
  .loginWidth{
    width: 100%;
  }
}
</style>
