<template>
    <div class="components-container">
        <code>富文本编辑器Tinymce</code>
        <code> <a target="_blank" class="link-type" href="https://panjiachen.github.io/vue-element-admin-site/#/rich-editor">学习文档</a></code>
        <div class="editor">
            <tinymce :height="300" v-model="content"></tinymce> 
        </div>
        <div class="editor-content" v-html="content"></div>
    </div>
</template>

<script>
import Tinymce from '@/components/Tinymce'
export default {
  name: 'tiny',
  components: {
    Tinymce
  },
  data() {
    return {
      content: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.editor{
  float: left;
  width: 49%;
}
.editor-content{
  float: right;
  width: 49%;
  height: 25.5rem;
  border: 1px solid #c0c0c0;
      overflow: scroll;
}
img{
  object-fit: cover;
  border:1px solid red
}
</style>
