<template>
  <div class="dashboard-container">
    <div class="dashboard-editor-container">
      <panl-group  @handleSetLineChartData="handleSetLineChartData" ></panl-group>
      <el-row class="lineChart">
        <line-chart :chart-data="lineChartData"></line-chart>
      </el-row>
      
      <el-row :gutter="32">
        <el-col  :sm="24" :lg="8">
          <div class="lineChart">
            <raddar-chart></raddar-chart>  
          </div>
        </el-col>
         <el-col  :sm="24" :lg="8">
           <div class="lineChart">
            <pie-chart></pie-chart>  
          </div>
        </el-col>
         <el-col  :sm="24" :lg="8">
            <div class="lineChart">
            <bar-chart></bar-chart>  
          </div>
        </el-col>
      </el-row>
        <el-row :gutter="8">
        <el-col  :sm="24" :lg="12">
          <div class="lineChart">
           <transaction-table></transaction-table>
          </div>
        </el-col>
         <el-col  :sm="24" :lg="12">
            <div class="lineChart">
            <BoxCard></BoxCard>
          </div>
        </el-col>
      </el-row>
    </div>
    <!-- <component :is="currentRole"></component> -->
    <!-- <div class="dashboard-text">name:{{name}}</div>
    <div class="dashboard-text">roles:<span v-for='role in roles' :key='role'>{{role}}</span></div> -->

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// import adminDashboard from './admin'
// import editorDashboard from './editor'

import PanlGroup from './components/PanelGroup'
import LineChart from './components/LineChart'
import RaddarChart from './components/RaddarChart'
import PieChart from './components/PieChart'
import BarChart from './components/BarChart'
import TransactionTable from './components/TransactionTable'
import BoxCard from './components/BoxCard'
const lineChartData = {
  newVisitis: {
    expectedData: [100, 120, 161, 134, 105, 160, 165],
    actualData: [120, 82, 91, 154, 162, 140, 145]
  },
  messages: {
    expectedData: [200, 192, 120, 144, 160, 130, 140],
    actualData: [180, 160, 151, 106, 145, 150, 130]
  },
  purchases: {
    expectedData: [80, 100, 121, 104, 105, 90, 100],
    actualData: [120, 90, 100, 138, 142, 130, 130]
  },
  shoppings: {
    expectedData: [130, 140, 141, 142, 145, 150, 160],
    actualData: [120, 82, 91, 154, 162, 140, 130]
  }
}
export default {
  name: 'dashboard',
  components: {
    // adminDashboard,
    // editorDashboard,
    PanlGroup,
    LineChart,
    RaddarChart,
    PieChart,
    BarChart,
    TransactionTable,
    BoxCard
  },
  data() {
    return {
      name: '管理员',
      lineChartData: lineChartData.newVisitis
    }
  },
  computed: {
    ...mapGetters([
      'roles'
    ])
  },
  created() {
    if (!this.roles.includes('admin')) {
      this.currentRole = 'editorDashboard'
    }
  },
  methods: {
    handleSetLineChartData(item) {
      this.lineChartData = lineChartData[item]
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
  &-editor-container{
    margin-top: 50px;
    padding: 30px;
    background: #f0f2f5;
  }
}
.lineChart{
  background: #fff;
  padding:16px 16px 0;
  margin-bottom:32px;
}
</style>
