<template>
  <el-menu class="navbar" mode="horizontal">
    <h2 class="header-title">{{$t('logins.title')}}</h2>
    <!-- 图标 -->
    <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>
    <!-- 面包屑 -->
    <breadcrumb></breadcrumb>
    <lang-select class="lang-container"></lang-select>
    <!-- 全屏 -->
    <Screenfull class="screenfull"></Screenfull>
    <!-- 颜色 -->
    <ThemePicker class="theme-picker"></ThemePicker>
    <!-- 头像 -->
    <TopNavBar></TopNavBar>
  </el-menu>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import Screenfull from '@/components/Fullscreen'
import ThemePicker from '@/components/ThemePicker'
import TopNavBar from './TopNavBar'
import LangSelect from '@/components/LangSelect'
export default {
  components: {
    Breadcrumb,
    Hamburger,
    TopNavBar,
    Screenfull,
    ThemePicker,
    LangSelect
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('ToggleSideBar')
    },
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload() // 为了重新实例化vue-router对象 避免bug
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  height: 50px;
  line-height: 50px;
  border-radius: 0px !important;
  // 专门应对返回顶部
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1002;
  width: 100%;
  padding-bottom: 50px;
  text-align: initial;
  // .title{
  //   float:left;
  //   width: 180px;
  //   text-align: center;
  //   font-weight: bold;
  // }
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  .screenfull {
    position: absolute;
    right: 90px;
    top: 16px;
    color: red;
  }
  .header-title{
    float: left;
    width: 180px;
    margin: 0 ;
    line-height: 50px;
    font-size: 24px;
    text-align: center;
    background: #ffffff;
    color: #64d9d6;
  }
  .theme-picker{
    display: inline-block;
    vertical-align: 15px;
    position: absolute;
    right: 130px;
    top: 10px;
    color: red;
  }
  .lang-container{
    position: absolute;
    right: 180px;
    top: 0px;
  }
}
</style>