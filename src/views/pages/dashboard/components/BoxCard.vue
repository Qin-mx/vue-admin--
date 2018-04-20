<template>
    <div class="box-card">
      <div class="box-card-header">
            <img src='https://wpimg.wallstcn.com/e7d23d71-cf19-4b90-a1cc-f56af8c0903d.png' alt="图片">
      </div>
      <div class="box-card-body">
        <div style="position:relative">
           <pan-thumb class="panThumb" :image="avatar"></pan-thumb>
            <text-hover-effect  className='mallki-text' :text="context"></text-hover-effect>
            <h3>&nbsp;</h3>
            <div class="progress-item">
                <span>脆鸡堡</span>
                <el-progress :text-inside="true" :stroke-width="18" :percentage="70"></el-progress>
            </div>
            <div class="progress-item">
                <span>芝士牛肉堡</span>
                <el-progress :text-inside="true" :stroke-width="18" :percentage="80" color="rgba(142, 113, 199, 0.7)"></el-progress>
            </div>
            <div class="progress-item">
                <span>鳕鱼堡</span>
                <el-progress :text-inside="true" :stroke-width="18" :percentage="100" status="success"></el-progress>
            </div>
            <div class="progress-item">
                <span>培根鸡蛋堡</span>
                <el-progress :text-inside="true" :stroke-width="18" :percentage="50" status="exception"></el-progress>
            </div>
        </div>
      </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import PanThumb from '@/components/PanThumb'
import TextHoverEffect from '@/components/TextHoverEffect'
export default {
  data() {
    return {
      context: '好吃的汉堡'
    }
  },
  components: {
    PanThumb,
    TextHoverEffect
  },
  computed: {
    ...mapGetters([
      'avatar'
    ])
  }
}
</script>

<style lang="scss" scoped>
.box-card{
    .box-card-header{
        position: relative;
        height: 220px;
        width: 100%;
        overflow: hidden;
        img{
            width: 100%;
            height: 100%;
            transition: all 0.23s linear;
            &:hover{
                transform: scale(1.1,1.1);
                filter: contrast(130%);
            }
        }
    }
    .progress-item{
        font-size: 14px;
        span{
            line-height: 32px;
        }
    }
    .box-card-body{
        padding: 14px;
    }
    .panThumb {
        height: 70px!important;
        width: 70px!important;
        position: absolute!important;
        top: -45px;
        left: 0px;
        border: 5px solid #ffffff;
        background-color: #fff;
        margin: auto;
        box-shadow: none!important;
    }
    .mallki-text {
        position: absolute;
        top: 0px;
        right: 0px;
        font-size: 20px;
        font-weight: bold;
    }
   @media only screen and (max-width: 1510px){
    .mallki-text{
      display: none;
    }
  }
}
</style>
