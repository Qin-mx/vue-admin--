<template>
    <div class="components-container">
        <code>CountTo组件的使用</code>
        <code><a href="https://www.npmjs.com/package/vue-count-to">学习地址</a></code>
        <count-to ref="example" class="example" :startVal='startVal' :endVal='endVal' :duration='duration' :prefix="prefix" :suffix="suffix"></count-to>

        <div class="container">
            <label class="label" for="startVal">startVal:
                <el-input-number v-model="startVal" controls-position="right" :min="1"></el-input-number>
            </label>

            <label class="label" for="endValInput">endVal:
                <el-input-number v-model="endVal" controls-position="right" :min="1"></el-input-number>
            </label>

            <label class="label" for="durationInput">duration:
                <el-input-number v-model="duration" controls-position="right" :min="1"></el-input-number>
            </label>

             <label class="label" for="suffixInput">suffix:
                <el-input v-model="suffix" controls-position="right" style="width:33%;"></el-input>
            </label>

             <label class="label" for="prefixInput">prefix:
                <el-input v-model="prefix" controls-position="right" style="width:33%;"></el-input>
            </label>

            <el-button type="primary"  @click.native="start">开始</el-button>
            <el-button type="warning" @click.native="pauseResume">暂停/恢复</el-button>
            <code>&lt;count-to :start-val=&#x27;{{startVal}}&#x27; :end-val=&#x27;{{endVal}}&#x27; :duration=&#x27;{{duration}}&#x27; :prefix=&#x27;{{prefix}}&#x27; :suffix=&#x27;{{suffix}}&#x27;
        :autoplay=false&gt;</code>

        <div class="blur"></div>
        </div>
    </div> 
</template>

<script>
import CountTo from 'vue-count-to'
export default {
  name: 'CountTo-demo',
  components: {
    CountTo
  },
  data() {
    return {
      startVal: 0,
      endVal: 2018,
      duration: 2000,
      prefix: '￥',
      suffix: 'rmb'
    }
  },
  methods: {
    start() {
      this.$refs.example.start()
    },
    pauseResume() {
      this.$refs.example.pauseResume()
    }
  }
}
</script>

<style lang="scss" scoped>
.example{
    font-size: 50px;
    color: #F6416C;
    display: block;
    margin: 10px 0;
    text-align: center;
    font-size: 80px;
    font-weight: 500;
}
.container{
    margin-top: 40px;
    margin-left: 20%;
    label{
        display: inline-block;
        margin: 0 20px;
        height: 60px;
    }
}
.blur {
    width: 100px;
    height: 100px;
        // background: -webkit-linear-gradient(left, rgba(0, 171, 255, 1) 0%, rgba(85, 255, 226, 1) 100%); 
        background:linear-gradient(
        #535151 30%,
        #747575 70%
        );
    }
</style>
