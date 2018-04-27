<template>
     <el-dropdown trigger="click" @command="handleCommand"  class='international'>
      <span class="el-dropdown-link">
         <svg-icon class-name='international-icon' icon-class="language" />
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="zh" :disabled="language==='zh'">中文</el-dropdown-item>
        <el-dropdown-item command="en" :disabled="language==='en'">English</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
</template>

<script>
    export default {
      computed: {
        language() {
          return this.$store.getters.language
        }
      },
      methods: {
        handleCommand(command) {
          this.$i18n.locale = command
          this.$store.dispatch('setLanguage', command)
          this.$message('切换语言成功')
          console.log(this.$i18n.locale)
        }
      }
    }
</script>

<style scoped>
.international-icon {
  font-size: 20px;
  cursor: pointer;
  vertical-align: -5px!important;
}
</style>
