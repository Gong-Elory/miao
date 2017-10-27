<template>
  <div class="m-header tab">
    <router-link class="tab-item" to="/story">
      <span class="tab-link">故事</span>
    </router-link>
    <router-link class="tab-item" to="/music">
      <span class="tab-link">音乐</span>
    </router-link>
    <router-link class="player" to="/player">
      <i class="fa fa-music" aria-hidden="true"></i>
    </router-link>
  </div>
</template>
<script type="text/ecmascript-6"></script>
<style lang="scss" scoped rel="stylesheet/scss">
  @import '~base/style/variables.scss';
  .m-header {
    width: 100%;
    height: 40px;
    line-height: 40px;
    background-color: $default-color;
  }

  .tab {
    padding: 0 90px;
    display: flex;
    font-size: $font-size-medium-x;
    .tab-item {
      flex: 1;
      text-align: center;
      color: $color-text-ll;
      font-weight: 500;
      &.router-link-active {
        color: $color-text;
        font-weight: 800
      }
    }
    .player{
      position: absolute;
      right: 20px;
      color:#fff;
    }
  }
</style>