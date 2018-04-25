<template>
 <div>
    <div :class="className" :style="{top:FixedTop+'px',zIndex:zIndex,position:position,width:width,heigth:height}">
      <slot>
        <div>固定头部</div>
      </slot>
  </div>
  </div>
</template>

<script>
export default {
  props: {
    FixedTop: {
      type: Number,
      default: 0
    },
    zIndex: {
      type: Number,
      default: 1
    },
    className: {
      type: String
    }
  },
  data() {
    return {
      width: undefined,
      height: undefined,
      active: false,
      position: '',
      currentTop: '',
      FixedHeight: 0
    }
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener('scroll', this.handleScroll)
    })
  },
  activated() {
    this.handleScroll()
  },

  destroyed() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll() {
      const top = this.$el.getBoundingClientRect().top
      console.log(this.$el.getBoundingClientRect().top)
      //   如果顶部距离元素的距离小于0
      if (top <= this.FixedHeight) {
        this.fixed()
        return
      }
      this.reset()
    },
    fixed() {
      if (this.active) {
        return
      }
      this.position = 'fixed'
      this.active = true
      this.width = this.$el.getBoundingClientRect().width + 'px'
    },
    reset() {
      if (!this.active) {
        return
      }
      this.position = ''
      this.width = 'auto'
      this.active = false
    }
  }
}
</script>
