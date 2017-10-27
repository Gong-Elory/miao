<template>
  <div class="progress-wrapper">
    <div class="bar-inner"><!-- 进度条的容器 -->
      <div class="progress"></div><!-- 进度条 -->
      <div class="progress-btn"><!-- 进度条按钮 -->
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
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
    }
  }
</style>