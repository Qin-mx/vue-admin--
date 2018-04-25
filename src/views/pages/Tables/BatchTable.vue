<template>
    <div class="app-container">
        <div class="filter-container">
            <el-button type="primary" v-waves @click="handleAdd">添加</el-button>
            <el-button type="primary" v-waves @click="hadnleBatchRemove">批量删除</el-button>
        </div>

        <el-table ref="multipleTable" :data="list" v-loading.body="listLoading" border fit highlight-current-row style="width: 100%" @selection-change="handleSelectionChange">
            <el-table-column
            type="selection"
            width="55"
            align="center">
            </el-table-column>

            <el-table-column width="180px" align="center" label="创建时间">
                <template slot-scope="scope">
                <span>{{scope.row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
                </template>
            </el-table-column>

            <el-table-column min-width="300px" label="标题">
                <template slot-scope="scope">
                <span>{{scope.row.title}}</span>
                </template>
             </el-table-column>

            <el-table-column width="110px" align="center" label="作者">
                <template slot-scope="scope">
                <span>{{scope.row.author}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="阅读量" width="95">
                <template slot-scope="scope">
                <span>{{scope.row.pageviews}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="操作">
                <template slot-scope="scope">
                  <el-button type="primary" size="mini" v-waves @click="handleEdit(scope.row)">编辑</el-button>
                  <el-button type="danger" size="mini" v-waves @click="handleRemove(scope.row)">删除</el-button>
                </template>
            </el-table-column>

        </el-table>

        <div class="pagination-container">
            <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="listQuery.page"
            :page-sizes="[20,40,60]"
            :page-size="100"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
            </el-pagination>
        </div>
    </div>
</template>

<script>
import { fetchList } from '@/api/article'
import waves from '@/directive/waves/index.js' // 水波纹指令
export default {
  name: 'DragTable',
  created() {
    this.getList()
  },
  directives: {
    waves
  },
  data() {
    return {
      list: null,
      total: null,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 15
      },
      multipleSelection: []
    }
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  methods: {
    getList() {
      this.listLoading = true
      fetchList(this.listQuery)
        .then(res => {
          this.listLoading = false
          this.list = res.data.items
          this.total = res.data.total
        })
        .catch(error => {
          console.log(error)
        })
    },
    handleAdd() {
      this.$router.push({ path: 'details' })
    },
    // 编辑
    handleEdit(row) {
      this.$router.push({ path: 'details', query: { id: row.id, obj: row }})
    },
    // 删除
    handleRemove(row) {
      const index = this.list.indexOf(row)
      this.$confirm('此操作将永久删除' + row.author + ', 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.list.splice(index, 1)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 批量删除
    hadnleBatchRemove() {
      var num = this.multipleSelection.length
      if (!num) {
        this.$message({
          message: '请先选择文件',
          type: 'warning'
        })
        return
      }

      if (num === 1) {
        var row = this.multipleSelection[0]
        this.handleRemove(row)
      } else {
        this.$confirm('此操作将永久删除文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          for (let i = 0; i < num; i++) {
            this.list.splice(this.list.indexOf(i), 1)
          }
          this.$message({
            type: 'success',
            message: '批量删除成功!'
          })
          this.$refs.multipleTable.clearSelection()
        }).catch(() => {
          console.log(1)
          this.$message({
            type: 'info',
            message: '批量删除已取消'
          })
        })
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    handleSizeChange(val) {
      this.listQuery.limit = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getList()
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
