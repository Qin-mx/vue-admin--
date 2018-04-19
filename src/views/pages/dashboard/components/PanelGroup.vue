<template>
    <el-row :gutter="40" class="panpel-group">
        <el-col :xs="12" :sm="12" :lg="6"  class="card-panpel-col" v-for="(item,index) in items" :key="index" >
             <!-- <el-card shadow="hover"> -->
                <div class="card-panpel" @click="handleSetLineChartData(item.data)">
                    <div class="card-panpel-icon-wrapper" :class="'icon-'+item.type">
                        <svg-icon :icon-class='item.type' class-name="card-panel-icon" />
                    </div>

                    <div class="card-panpel-description">
                        <div class="card-panpel-text">{{item.message}}</div>
                        <count-to class="card-panpel-num" :startVal='item.startVal' :endVal='item.endVal' :duration='item.duration'></count-to>
                    </div>
                </div>
            <!-- </el-card> -->
        </el-col>
    </el-row>
</template>

<script>
import CountTo from 'vue-count-to'
export default {
  name: 'PanelGroup',
  components: {
    CountTo
  },
  data() {
    return {
      context: '面板组',
      items: [
        {
          type: 'peoples',
          message: '注册人数',
          startVal: 0,
          endVal: 88246,
          duration: 2200,
          data: 'newVisitis'
        },
        {
          type: 'message',
          message: '消息',
          startVal: 0,
          endVal: 89365,
          duration: 2600,
          data: 'messages'
        },
        {
          type: 'money',
          message: '消费',
          startVal: 0,
          endVal: 95612,
          duration: 3200,
          data: 'purchases'
        },
        {
          type: 'shoppingCard',
          message: '购物',
          startVal: 0,
          endVal: 45646,
          duration: 3600,
          data: 'shoppings'
        }
      ]
    }
  },
  methods: {
    handleSetLineChartData(item) {
      this.$emit('handleSetLineChartData', item)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.panpel-group {
  margin-top: 18px;
  .card-panpel-col{
    margin-bottom: 32px;
    cursor: pointer;
    .card-panpel{
        height: 108px;
        background: #fff;
        border-color: rgba(0, 0, 0, .05);
        overflow: hidden;
        &:hover{
             box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
            .card-panpel-icon-wrapper{
                color: #fff
            }
            .icon-peoples{
                background: #40c9c6;
            }
            .icon-message {
                background: #36a3f7;
            }
            .icon-money {
                background: #f4516c;
            }
            .icon-shoppingCard {
                background: #34bfa3
            }
        }
        .icon-peoples{
            color: #40c9c6;
        }
        .icon-message {
            color: #36a3f7;
        }
        .icon-money {
            color: #f4516c;
        }
        .icon-shoppingCard {
            color: #34bfa3
        }
        .card-panpel-icon-wrapper{
            float: left;
            margin:15px 0 0 15px;
            padding:15px;
            border-radius: 6px; 
            transition: all 0.3s ease;
            .card-panel-icon{
                font-size: 48px;
            }
        }
        .card-panpel-description{
            float: right;
            font-size:16px;
            font-weight: bold;
            margin:25px 25px 25px 0;
            .card-panpel-text{
                color:  rgba(0, 0, 0, 0.45);
                margin-bottom: 12px;
            }
            .card-panpel-num{
                font-size:20px;
            }
        }
       
    }
  }
 
}
</style>
