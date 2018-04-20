<template>
    <div class="app-container">
        <h3>固定位置修改</h3>
        <fixed-table></fixed-table>
        <h3>不固定位置修改</h3>
        <un-fixed-table></un-fixed-table>
    </div>
</template>

<script>
import FixedTable from '@/components/DynamicTable/fixedTable'
import UnFixedTable from '@/components/DynamicTable/unfixedTable'
export default {
  name: 'DynamicTable',
  components: {
    FixedTable,
    UnFixedTable
  }
}
</script>