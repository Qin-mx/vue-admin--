<template>
    <div class="components-container">
        <code>富文本编辑器vue-quill-editor</code>
        <code><a target="_blank" class="link-type" href="http://www.jb51.net/article/120628.htm">学习文档</a></code>
        <div class="editor">
            <editor :formcontent="content" @on-content-change="onContentChange"></editor> 
        </div>
        <div class="editor-content" v-html="content"></div>
    </div>
</template>

<script>
    import Editor from '@/components/Editor'
    export default {
      name: 'editor-demo',
      components: {
        Editor
      },
      data() {
        return {
          content: ''
        }
      },
      methods: {
        onContentChange(val) {
          this.content = val
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
  height: 35.5rem;
  border: 1px solid #cccccc;
  overflow: scroll;
}
</style>
