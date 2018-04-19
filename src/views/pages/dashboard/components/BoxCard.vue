<template>
    <div class="box-card">
      <div class="box-card-header">
            <img src='https://wpimg.wallstcn.com/e7d23d71-cf19-4b90-a1cc-f56af8c0903d.png' alt="图片">
      </div>
      <div style="padding: 14px;position:relative;">
        <h3>好吃的汉堡</h3>
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
</template>

<script>

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
}
</style>
