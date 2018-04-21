<template>
 <!-- $t is vue-i18n global function to translate lang -->
  <div class="app-container">
    <el-input style='width:340px;' prefix-icon="el-icon-document" v-model="filename" placeholder="默认名称为excel-list"></el-input>
    <el-button style='margin-bottom:20px;' type="primary" icon="document" @click="handleDownload" :loading="downloadLoading">导出 excel</el-button>
    <el-table :data="list" v-loading.body="listLoading"  ref="multipleTable" element-loading-text="拼命加载中" border fit highlight-current-row @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center"></el-table-column>
      <el-table-column align="center" label='Id' width="95">
        <template slot-scope="scope">
          {{scope.row.id}}
        </template>
      </el-table-column>
      <el-table-column label="Title">
        <template slot-scope="scope">
          {{scope.row.title}}
        </template>
      </el-table-column>
      <el-table-column label="Author" width="110" align="center">
        <template slot-scope="scope">
          <el-tag>{{scope.row.author}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="Readings" width="115" align="center">
        <template slot-scope="scope">
          {{scope.row.pageviews}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="Date" width="220">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span>{{scope.row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { fetchList } from '@/api/article'
import { parseTime } from '@/utils' // 如果只是使用过滤，可以不用引入

export default {
  name: 'exportExcel',
  data() {
    return {
      list: null,
      listLoading: true,
      downloadLoading: false,
      filename: '',
      multipleSelection: []
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      fetchList().then(response => {
        this.list = response.data.items
        this.listLoading = false
      })
    },
    handleDownload() {
      if (this.multipleSelection.length) {
        this.downloadLoading = true
            import('@/vendor/Export2Excel').then(excel => {
              const tHeader = ['Id', '标题', '作者', '阅读量', '时间']
              const filterVal = ['id', 'title', 'author', 'pageviews', 'display_time']
              // const list = this.list
              const list = this.multipleSelection
              const data = this.formatJson(filterVal, list)
              this.$refs.multipleTable.clearSelection()
              excel.export_json_to_excel(tHeader, data, this.filename)
              this.downloadLoading = false
            })
      } else {
        this.$message({
          message: '请选择内容',
          type: 'warning'
        })
      }
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    },

    handleSelectionChange(val) {
      console.log(val)
      this.multipleSelection = val
    }
  }
}
</script>
