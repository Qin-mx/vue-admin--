<template>
  <div class="app-wrapper" :class="{hideSidebar:!sidebar.opened}">
    <!-- <el-scrollbar class="page-component__scroll"> -->
      <sidebar class="sidebar-container"></sidebar>
      <div class="main-container">
        <navbar></navbar>
        <TagView class="tagview"></TagView>
        <app-main></app-main>
      </div>
    <!-- </el-scrollbar>   -->
  </div>
</template>

<script>
import { Navbar, Sidebar, AppMain } from './components'
import TagView from '@/components/TagView'
export default {
  name: 'layout',
  components: {
    Navbar,
    Sidebar,
    AppMain,
    TagView
  },
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";
.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
}
.page-component__scroll{
  height: 100%;
}
.sidebar-container{
  top: 50px;
}
.tagview{
  position: relative;
  top: 51px;
  z-index: 1004;
}
</style>