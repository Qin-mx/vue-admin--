<template>
    <el-checkbox-group v-model="checkBoxList"  @change="handleCheckedCitiesChange">
        <el-checkbox v-for="item in options " :label="item" :key="item"></el-checkbox>
    </el-checkbox-group>
</template>

<script>
  export default {
    props: {
      options: {
        type: Array, // 不能加分号
        default: []
      },
      checkList: {
        type: Array,
        default: []
      }
    },
    data() {
      return {
        checkBoxList: this.checkList
      }
    },
    methods: {
      handleCheckedCitiesChange(value) {
        this.$emit('handleCheckbox', value)
      }
    }

  }
</script>