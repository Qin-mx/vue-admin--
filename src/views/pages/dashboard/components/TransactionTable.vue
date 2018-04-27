<template>
  <el-table
    :data="list"
    style="width: 100%">
    <el-table-column
      label="Order_No"
      show-overflow-tooltip
    >
    <template slot-scope="scope">
        {{scope.row.order_no}}
    </template>
    </el-table-column>

    <el-table-column
      label="Price"
    >
    <template slot-scope="scope">
        ￥{{scope.row.price}}
    </template>
    </el-table-column>

    <el-table-column
      label="标签"
      width="100"
      >
      <template slot-scope="scope">
        <el-tag
          :type="scope.row.status | statusFilter ">{{scope.row.status}}</el-tag>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
import { fetchList } from '@/api/transaction'
export default {
  created() {
    this.getList()
  },
  data() {
    return {
      list: []
    }
  },
  methods: {
    getList() {
      fetchList().then(response => {
        this.list = response.data.items.slice(0, 7)
      })
    }
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        success: 'success',
        pending: 'danger'
      }
      return statusMap[status]
    }
  }
}
</script>