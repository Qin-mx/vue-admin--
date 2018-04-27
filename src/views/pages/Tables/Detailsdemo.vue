<template>
    <div class="app-container">
        <div class="head-container ">
           {{content}}
        </div>
        <div class="formWidth">
              <el-form :model="temp" :rules="rules" ref="ruleForm" :label-width="formLabelWidth" class="demo-ruleForm">

            <el-form-item :label="$t('table.Title')" prop="title">
              <el-input type="text" v-model="temp.title"></el-input>
            </el-form-item>

            <el-table-column width="110px" align="center" :label="$t('table.Author')">
                <template slot-scope="scope">
                <span>{{scope.row.author}}</span>
                </template>
            </el-table-column>

            <el-form-item :label="$t('table.Readings')">
                 <el-input type="text" v-model="temp.pageviews"></el-input>
            </el-form-item>

        </el-form>
        <div class="footer-container">
          <el-button v-if="dialogStatus=='create'" type="primary" @click="createData">{{$t('table.Sure')}}</el-button>
          <el-button v-else type="primary" @click="updateData">{{$t('table.Sure')}}</el-button>
          <el-button @click="cancel">{{$t('table.Cancel')}}</el-button>
        </div>
        </div>
      
    </div>
</template>

<script>
export default {
  name: 'detailsdemo',
  created() {
    if (this.$route.query.id) {
      this.content = this.$t('table.Edit')
      this.dialogStatus = 'updata'
      this.temp = this.$route.query.obj
    } else {
      this.content = this.$t('table.AddTo')
      this.dialogStatus = 'create'
    }
  },
  data() {
    return {
      content: '',
      dialogStatus: '',
      temp: {
        id: undefined,
        title: '',
        importance: null,
        status: ''
      },
      formLabelWidth: '120px',
      rules: {
        title: [{ required: true, message: '标题不能为空', trigger: 'blur' }]
      }
    }
  },
  methods: {
    cancel() {
      this.$router.go(-1)
    },
    createData() {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          this.$notify({
            title: '操作提示',
            type: 'warning',
            message: '这是一条不会添加数据的提示消息'
          })
          this.cancel()
        }
      })
    },
    updateData() {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          this.$notify({
            title: '操作提示',
            type: 'warning',
            message: '这是一条不会更新数据的提示消息'
          })
          this.cancel()
        }
      })
    }
  }
}

</script>

<style lang="scss" scoped>
.formWidth{
    width: 700px;
    margin: 20px auto;
}
.head-container{
    background: #304156;
    color: #bfcbd9;
    line-height: 30px;
    text-indent: 20px;
    font-size: 14px;
}
.footer-container{
    text-align: center
}
</style>
