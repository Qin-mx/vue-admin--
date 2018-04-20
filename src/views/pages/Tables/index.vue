<template>
    <div class="app-container">
            <div class="filter-container">
                <el-col :span="4">
                    <el-input @keyup.enter.native="handleFilter" class="filter-item" placeholder="查询标题" v-model="listQuery.title"></el-input>
                </el-col>
                <el-col :span="3" offset="1">
                     <el-select clearable v-model="listQuery.status" placeholder="状态">
                        <el-option v-for="item in statusOptions" :key="item" :label="item" :value="item">
                        </el-option>
                    </el-select>
                </el-col>
                <el-col :span="5" :offset="1" style="width:200px">
                    <el-button type="primary" icon="el-icon-search"  @click="handleFilter">搜索</el-button>
                     <el-button type="primary" icon="el-icon-edit">添加</el-button>
                </el-col>
            </div>

    <el-table :data="list" v-loading="listLoading" element-loading-text="给我一点时间" border fit highlight-current-row
      style="width: 100%">
       <el-table-column align="center" label="ID" width="65">
            <template slot-scope="scope">
            <span>{{scope.row.id}}</span>
            </template>
        </el-table-column>

        <el-table-column width="180px" align="center" label="时间">
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

        <el-table-column width="100px" label="重要性">
            <template slot-scope="scope">
            <svg-icon v-for="n in +scope.row.importance" icon-class="star" class="icon-star" :key="n"></svg-icon>
            </template>
        </el-table-column>

        <el-table-column class-name="status-col" label="状态" width="110">
            <template slot-scope="scope">
            <el-tag :type="scope.row.status | statusFilter">{{scope.row.status}}</el-tag>
            </template>
        </el-table-column> 
      <el-table-column align="center" label="阅读数" width="95">
        <template slot-scope="scope">
          <span v-if="scope.row.pageviews" class="link-type">{{scope.row.pageviews}}</span>
          <span v-else>0</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="230" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini">编辑</el-button>
          <el-button v-if="scope.row.status != 'published'" size="mini" type="success" @click.native="hadnleModifyStatus(scope.row,'published')">发布
          </el-button>
          <el-button size="mini" v-if="scope.row.status!='draft'" @click.native="hadnleModifyStatus(scope.row,'draft')">草稿
          </el-button>
          <el-button  v-if="scope.row.status!='deleted'" size="mini" type="danger" @click.native="hadnleModifyStatus(scope.row,'deleted')">删除
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
    </div>
</template>

<script>
import { fetchList, fetchPv, createArticle, updateArticle } from '@/api/article'

export default {
  name: 'complex',
  created() {
    this.getList()
  },
  data() {
    return {
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
      statusOptions: ['published', 'draft', 'deleted']
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

    },
    hadnleModifyStatus (row,status){
      this.$message({
        type: 'success',
        message: '操作成功'
      })

      row.status = status;
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