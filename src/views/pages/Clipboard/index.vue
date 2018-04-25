<template>
    <div class="app-container">
        <h3>使用vue-clipboard2插件实现</h3>
        <el-input v-model="inputData" placeholder="Please input" style='width:400px;'></el-input>
        <el-button type="primary" icon="document" v-clipboard:copy='inputData' v-clipboard:success='onSuccess' v-clipboard:error='onError'>copy</el-button>
    </div>
</template>

<script>

export default {
  name: 'clipboard',
  data() {
    return {
      inputData: 'https://jingyan.baidu.com/article/48a42057156888a9242504fd.html'
    }
  },
  methods: {
    onSuccess() {
      this.$message({
        message: '复制成功',
        type: 'success',
        duration: 1500
      })
    },
    onError() {
      this.$message({
        message: '复制失败',
        type: 'danger',
        duration: 1500
      })
    }
  }
}
</script>