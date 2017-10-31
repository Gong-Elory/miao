<template>
  <div class="progress-wrapper" ref="wrapper">
    <div class="bar-inner" ><!-- 进度条的容器 -->
      <div class="progress" ref="progress" ></div><!-- 进度条 -->
      <div class="progress-btn" ref="btn" 
      @touchstart.prevent.stop="progressTouchStart" 
      @touchmove.prevent="progressTouchMove" 
      @touchend="progressTouchEnd"><!-- 进度条按钮 -->
        <i class="fa fa-spinner fa-pulse fa-3x fa-fw" v-show="!canplay"></i>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  const btnWidth = 6
  export default {
    props: {
      percent: {
        type: Number,
        default: 0
      },
      canplay: {
        type: Boolean,
        default: false
      }
    },
    created() {
      this.touch = {}
    },
    data() {
      return {
        wrapWidth:0
      }
    },
    methods: {
      progressTouchStart(e){
        this.touch.init = true
        this.touch.startX = e.touches[0].pageX
        /* 进度条现在的距离 */
        this.touch.left = this.$refs.progress.clientWidth
      },
      progressTouchMove(e){
        if (!this.touch.init) {
          return
        }
        const deX = e.touches[0].pageX - this.touch.startX
        const offsetWidth = Math.min(this.wrapWidth - btnWidth,Math.max(0, this.touch.left + deX))
        this._moveBtn(offsetWidth)
      },
      progressTouchEnd(){
        this.touch.init = false
        this._triggerPercent()
      },
      _moveBtn(offsetWidth) {
        if(!this.canplay) return
        this.$refs.progress.style.width = `${offsetWidth}px`
        this.$refs.btn.style.left = `${offsetWidth}px`
      },
      _triggerPercent(){
        if(!this.canplay) return
        const percent =  this.$refs.progress.clientWidth / this.wrapWidth 
        this.$emit('percentchange', percent)
      }
    },
    watch: {
      percent(newVal) {
        if(!this.wrapWidth) {this.wrapWidth = this.$refs.wrapper.clientWidth}
        if(this.touch.init) return
        this.$refs.progress.style.width = `${this.wrapWidth * newVal}px`
        this.$refs.btn.style.left = `${this.wrapWidth * newVal - btnWidth}px`
      },
      canplay(newVal){
        console.log(newVal)
      }
    }
  }
</script>
<style lang="scss" scoped rel="stylesheet/scss">
  @import '~base/style/variables.scss';
  .progress-wrapper{
    height: 30px;
    margin: 0 10px;
    .bar-inner {
      position: relative;
      top: 13px;
      height: 4px;
      width: 100%;
      background: rgba(255, 255, 255, 0.3);
      .progress{
        position: absolute;
        height: 100%;
        background-color: $default-color;
      }
      .progress-btn{
        position: absolute;
        left: -4px;
        top: -4px;
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background-color: $default-color;
      }
      .fa-pulse{
        font-size: 12px;
        color: #fff;
        position: absolute;
        top: 0;
        left: -1.5px;
      }
    }
  }
</style>