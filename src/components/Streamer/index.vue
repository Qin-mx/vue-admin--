<template>
    <div class="text">{{text}}</div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: 'admin'
    }
  }
}
</script>

<style lang="scss" scoped>
.text{
        font-size: 24px;
        font-weight: bold;
        -webkit-text-fill-color: transparent;
        background-image:  -webkit-linear-gradient(left,#129835,#ece648 25%,#129835 50%,#F9E92B 75%,rgb(40, 150, 38));
        -webkit-background-clip: text;
        background-size: 200% 100%;
        -webkit-animation: word 5s linear infinite ;
    }
    @keyframes word{
        0%{background-position: 0 0}
        100%{background-position: -100% 0}
    }
</style>
