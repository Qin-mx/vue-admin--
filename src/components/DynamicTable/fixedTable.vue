<template>
    <div class="app-container">
        <div class="filter-container">
            <nav-tool :checkList="checkList" :options="TheadOPtions" @handleCheckbox="handleCheckbox"></nav-tool>
        </div>
        <el-table
        :data="tableData"
        :key='key'
        style="width: 100%"
        fit
        border>
          <el-table-column
              prop="name"
              label="姓名"
              width="180">
          </el-table-column>
          <el-table-column
              v-for=" item in Thead"
              :label="item"
              :key="item"
              >
              <template slot-scope="scope">
                {{scope.row[item]}}
              </template>
          </el-table-column>
        </el-table>
        </div>
</template>

<script>
import NavTool from './NavTool'
const defaultThead = ['date', 'address']
export default {
  components: {
    NavTool
  },
  data() {
    return {
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
        province: '上海',
        city: '普陀区'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄',
        province: '上海',
        city: '普陀区'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄',
        province: '上海',
        city: '普陀区'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄',
        province: '上海',
        city: '普陀区'
      }],
      checkList: defaultThead, // 选择的头部
      TheadOPtions: ['date', 'address', 'province', 'city'],
      Thead: defaultThead, // 默认存在的头部
      key: 1
    }
  },
  // watch: {
  //   checkList(val) {
  //     console.log(val)
  //     this.Thead = this.TheadOPtions.filter(i => {
  //       val.indexOf(i) >= 0
  //     })
  //   }
  // },
  methods: {
    handleCheckbox(value) {
      this.checkList = value
      this.Thead = this.TheadOPtions.filter(i => {
        return this.checkList.indexOf(i) >= 0
      })
      this.key = this.key + 1// 为了保证table 每次都会重渲
      console.log(this.Thead)
    }
  }
}
</script>