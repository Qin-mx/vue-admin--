<template>
    <div class="app-container">
            <div class="filter-container">
                <el-col :span="4">
                    <el-input @keyup.enter.native="handleFilter"  class="filter-item" :placeholder="$t('table.SearchTitle')" v-model="listQuery.title"></el-input>
                </el-col>
                <el-col :span="3" :offset="1" @change='handleFilter'>
                     <el-select clearable v-model="listQuery.importance" :placeholder="$t('table.Importance')">
                        <el-option v-for="item in importanceOptions" :key="item" :label="item" :value="item">
                        </el-option>
                    </el-select>
                </el-col>
                <el-col :span="5" :offset="1" style="width:300px">
                    <el-button type="primary" icon="el-icon-search"  @click="handleFilter">{{$t('table.Search')}}</el-button>
                     <el-button type="primary" icon="el-icon-edit" @click="handleCreate">{{$t('table.AddTo')}}</el-button>
                </el-col>
                 <el-checkbox class="filter-item" @change="tableKey=tableKey+1" v-model="showReviewer" >{{$t('table.Auditor')}}</el-checkbox>
            </div>

    <el-table :data="list" :key='tableKey' v-loading="listLoading"  border fit highlight-current-row
      style="width: 100%">
       <el-table-column align="center" label="ID" width="65">
            <template slot-scope="scope">
            <span>{{scope.row.id}}</span>
            </template>
        </el-table-column>

        <el-table-column width="180px" align="center" :label="$t('table.Date')">
            <template slot-scope="scope">
            <span>{{scope.row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
            </template>
        </el-table-column>

        <el-table-column min-width="300px" :label="$t('table.Title')">
            <template slot-scope="scope">
            <span class="link-type" @click="handleEdit(scope.row)">{{scope.row.title}}</span>
            </template>
        </el-table-column>

        <el-table-column width="110px" align="center" :label="$t('table.Author')">
            <template slot-scope="scope">
            <span>{{scope.row.author}}</span>
            </template>
        </el-table-column>

        <el-table-column width="110px" v-if='showReviewer' align="center" :label="$t('table.Auditor')">
          <template slot-scope="scope">
            <span style='color:red;'>{{scope.row.reviewer}}</span>
          </template>
        </el-table-column>

        <el-table-column width="100px" :label="$t('table.Importance')">
            <template slot-scope="scope">
            <svg-icon v-for="n in +scope.row.importance" icon-class="star" class="icon-star" :key="n"></svg-icon>
            </template>
        </el-table-column>

        <el-table-column class-name="status-col" :label="$t('table.Status')" width="110">
            <template slot-scope="scope">
            <el-tag :type="scope.row.status | statusFilter">{{scope.row.status}}</el-tag>
            </template>
        </el-table-column> 
      <el-table-column align="center" :label="$t('table.Readings')" width="95">
        <template slot-scope="scope">
          <span v-if="scope.row.pageviews" >{{scope.row.pageviews}}</span>
          <span v-else>0</span>
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('table.Operation')" width="230" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click.native="handleEdit(scope.row)">{{$t('table.Edit')}}</el-button>
          <el-button v-if="scope.row.status != 'published'" size="mini" type="success" @click.native="hadnleModifyStatus(scope.row,'published')">{{$t('table.Release')}}
          </el-button>
          <el-button size="mini" v-if="scope.row.status!='draft'" @click.native="hadnleModifyStatus(scope.row,'draft')">{{$t('table.Draft')}}
          </el-button>
          <el-button  v-if="scope.row.status!='deleted'" size="mini" type="danger" @click.native="hadnleModifyStatus(scope.row,'deleted')">{{$t('table.Remove')}}
          </el-button>
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
    <!-- 打开编辑页面 -->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
        <el-form :model="temp" :rules="rules" ref="ruleForm" :label-width="formLabelWidth" class="demo-ruleForm">

            <el-form-item label="标题" prop="title">
              <el-input type="text" v-model="temp.title"></el-input>
            </el-form-item>

            <el-form-item label="状态">
              <el-select  v-model="temp.status" placeholder="选择状态">
                <el-option v-for="item in  statusOptions" :key="item" :label="item" :value="item">
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="重要性">
              <el-rate
              style="margin-top:10px;"
                v-model="temp.importance"
                :colors="['#99A9BF', '#F7BA2A', '#FF9900']" 
                :max="3">
              </el-rate>
            </el-form-item>

        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button v-if="dialogStatus=='create'" type="primary" @click="createData">确 定</el-button>
          <el-button v-else type="primary" @click="updateData">确 定</el-button>
        </div>
      </el-dialog>
    </div>
</template>

<script>
import { fetchList, createArticle, updateArticle } from '@/api/article'

export default {
  name: 'complex',
  created() {
    this.getList()
  },
  data() {
    return {
      tableKey: 0,
      list: null,
      total: null,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: '+id'
      },
      importanceOptions: [1, 2, 3],
      statusOptions: ['published', 'draft', 'deleted'],
      textMap: {
        update: '编辑',
        create: '创建'
      },
      dialogStatus: '',
      dialogFormVisible: false,
      temp: {
        id: undefined,
        title: '',
        importance: null,
        status: ''
      },
      rules: {
        title: [{ required: true, message: '标题不能为空', trigger: 'blur' }]
      },
      formLabelWidth: '120px',
      showReviewer: false
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
      fetchList(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total
        this.listLoading = false
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    hadnleModifyStatus(row, status) {
      this.$message({
        type: 'success',
        message: '操作成功'
      })

      row.status = status
    },
    handleSizeChange(val) {
      this.listQuery.limit = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getList()
    },
    // 编辑
    handleEdit(val) {
      this.dialogFormVisible = true
      this.dialogStatus = 'update'

      this.temp = Object.assign({}, val) // 这样就不会共用同一个对象
      this.$nextTick(() => {
        this.$refs['ruleForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          this.dialogFormVisible = false
          const tempData = Object.assign({}, this.temp)
          updateArticle(tempData).then(() => {
            for (const v of this.list) {
              if (v.id === this.temp.id) {
                const index = this.list.indexOf(v)
                this.list.splice(index, 1, this.temp)
                break
              }
            }
            this.dialogFormVisible = false
            this.$message({
              message: '更新成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    // 创建
    handleCreate() {
      this.resetTemp()
      this.dialogFormVisible = true
      this.dialogStatus = 'create'
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          this.temp.id = parseInt(Math.random() * 100) + 101 // 模拟数据id
          this.temp.author = 'admin' // 因为需要作者
          this.temp.timestamp = new Date()
          createArticle(this.temp).then(res => {
            this.list.unshift(this.temp) // 添加到数组的最前面
            this.dialogFormVisible = false
            this.$message({
              message: '创建成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    // 重置
    resetTemp() {
      this.temp = {
        id: undefined,
        title: '',
        importance: null,
        status: ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.demo-ruleForm{
  width: 400px;
}
.filter-item{
  line-height: 36px;
}
</style>

<style lang="scss">
  label{
    font-weight:700
  }
</style>

